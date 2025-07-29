const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../services/auth.service");
const {
  handleValidationErrors,
  validateRegistration,
  validateLogin,
  validateRefreshToken,
} = require("../middleware/validate");
const { generateTokens } = require("../utils/token.utils"); // assuming token generator here

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
    handleValidationErrors,
    validateRegistration,
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await registerUser(email, password);
      const { accessToken, refreshToken } = await generateTokens(user.id);
      res.status(201).json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
    handleValidationErrors,
    validateLogin,
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await loginUser(
        email,
        password
      );
      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
);

// Refresh Token
router.post("/refresh-token", validateRefreshToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logout
router.post("/logout", validateRefreshToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await logoutUser(refreshToken);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
