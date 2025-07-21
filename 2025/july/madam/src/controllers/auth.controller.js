const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateTokens, verifyRefreshToken } = require("../utils/jwt.utils");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing) return res.status(400).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hash },
  });

  const tokens = generateTokens(user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  res.status(201).json({ ...tokens, user: { id: user.id, username, email } });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const tokens = generateTokens(user.id);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  res.json({ ...tokens, user: { id: user.id, username, email: user.email } });
};

exports.refresh = async (req, res) => {
  try {
    const { token } = req.body;
    const payload = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const tokens = generateTokens(user.id);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.json(tokens);
  } catch (err) {
    res.status(403).json({ error: "Token expired or invalid" });
  }
};

exports.logout = async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: { refreshToken: null },
  });
  res.json({ message: "Logged out" });
};

exports.resetRequest = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.json({ message: "If email exists, password reset sent" });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: token,
      resetExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  // Send token via email here in real app
  res.json({ message: "Reset token generated", token });
};

exports.resetConfirm = async (req, res) => {
  try {
    const { token, password } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (
      !user ||
      user.resetToken !== token ||
      new Date() > user.resetExpiresAt
    ) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, resetToken: null, resetExpiresAt: null },
    });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
