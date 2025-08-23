from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from uuid import uuid4

from .database import get_db
from .models import User, RefreshToken
from .schemas import RegisterRequest, LoginRequest, TokenPair, RefreshRequest, LogoutRequest, UserOut
from .utils import hash_password, verify_password
from .config import JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES

router = APIRouter(prefix="/auth", tags=["auth"])

def _create_tokens(user_id: int) -> TokenPair:
    now = datetime.now(tz=timezone.utc)
    access_exp = now + ACCESS_TOKEN_EXPIRES
    refresh_exp = now + REFRESH_TOKEN_EXPIRES

    access_payload = {
        "sub": str(user_id),
        "type": "access",
        "iat": int(now.timestamp()),
        "exp": int(access_exp.timestamp()),
    }
    refresh_jti = uuid4().hex
    refresh_payload = {
        "sub": str(user_id),
        "type": "refresh",
        "jti": refresh_jti,
        "iat": int(now.timestamp()),
        "exp": int(refresh_exp.timestamp()),
    }

    access_token = jwt.encode(access_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    refresh_token = jwt.encode(refresh_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=int(ACCESS_TOKEN_EXPIRES.total_seconds())
    ), refresh_jti, refresh_exp

@router.post("/register", response_model=UserOut, status_code=201)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = User(email=body.email, password_hash=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=TokenPair)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    tokens, jti, refresh_exp = _create_tokens(user.id)

    # persist refresh jti
    rt = RefreshToken(user_id=user.id, jti=jti, expires_at=refresh_exp, revoked=False)
    db.add(rt)
    db.commit()
    return tokens

@router.post("/refresh", response_model=TokenPair)
def refresh(body: RefreshRequest, db: Session = Depends(get_db)):
    # decode refresh token
    try:
        payload = jwt.decode(body.refresh_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    user_id = int(payload.get("sub"))
    jti = payload.get("jti")
    exp_ts = payload.get("exp")

    # validate stored token
    stored = db.query(RefreshToken).filter(RefreshToken.jti == jti, RefreshToken.user_id == user_id).first()
    if not stored or stored.revoked:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token revoked or not found")

    # check expiry
    if datetime.now(tz=timezone.utc) > stored.expires_at:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired")

    # rotate: revoke old, issue new
    stored.revoked = True
    db.add(stored)

    tokens, new_jti, new_exp = _create_tokens(user_id)
    db.add(RefreshToken(user_id=user_id, jti=new_jti, expires_at=new_exp, revoked=False))
    db.commit()

    return tokens

@router.post("/logout")
def logout(body: LogoutRequest, db: Session = Depends(get_db)):
    # client must send the refresh token to revoke
    try:
        payload = jwt.decode(body.refresh_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not a refresh token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid refresh token")

    user_id = int(payload.get("sub"))
    jti = payload.get("jti")

    stored = db.query(RefreshToken).filter(RefreshToken.jti == jti, RefreshToken.user_id == user_id).first()
    if stored and not stored.revoked:
        stored.revoked = True
        db.add(stored)
        db.commit()

    return {"message": "Logged out"}
