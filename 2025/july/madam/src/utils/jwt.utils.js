const jwt = require("jsonwebtoken");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ sub: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_SECRET);

module.exports = { generateTokens, verifyRefreshToken };
