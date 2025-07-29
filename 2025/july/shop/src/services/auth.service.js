const db = require("../config/db");
const { users, refreshTokens } = require("../models/user.model");
const { eq, and, gt } = require("drizzle-orm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

async function generateTokens(userId) {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(
    { id: userId },
    JWT_SECRET + REFRESH_TOKEN_SECRET_SUFFIX,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  // Store refresh token in database
  await db.insert(refreshTokens).values({
    userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  });

  return { accessToken, refreshToken };
}

async function registerUser(email, password) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [newUser] = await db
    .insert(users)
    .values({ email, password: hashedPassword })
    .returning();

  return newUser;
}

async function loginUser(email, password) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user.id);

  return { user, accessToken, refreshToken };
}

async function refreshAccessToken(refreshToken) {
  // Verify refresh token
  const decoded = jwt.verify(
    refreshToken,
    JWT_SECRET + REFRESH_TOKEN_SECRET_SUFFIX
  );

  // Check if refresh token exists in database and isn't expired
  const [tokenRecord] = await db
    .select()
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.token, refreshToken),
        eq(refreshTokens.userId, decoded.id),
        gt(refreshTokens.expiresAt, new Date())
      )
    );

  if (!tokenRecord) {
    throw new Error("Invalid refresh token");
  }

  // Generate new access token
  const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { accessToken };
}

async function logoutUser(refreshToken) {
  await db.delete(refreshTokens).where(eq(refreshTokens.token, refreshToken));
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
