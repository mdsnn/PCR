const express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../services/auth.service");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

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
  ],
  validate,
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

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  validate,
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

router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await logoutUser(refreshToken);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
