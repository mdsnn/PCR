const express = require("express");
const passport = require("../config/passport.config");
const authService = require("../services/auth.service");
const { validate } = require("../middleware/validate");
const {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../schemas/user.schema");

const router = express.Router();

// Signup route
router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.signup(email, password);
    const tokens = authService.generateTokens(user.id);

    // Save refresh token
    await authService.saveRefreshToken(user.id, tokens.refreshToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Login route
router.post("/login", validate(loginSchema), (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info.message || "Authentication failed",
        });
      }

      const tokens = authService.generateTokens(user.id);

      // Save refresh token
      await authService.saveRefreshToken(user.id, tokens.refreshToken);

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  })(req, res, next);
});

// Refresh token route
router.post("/refresh", validate(refreshTokenSchema), async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      message: "Token refreshed successfully",
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
});

// Logout route
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await authService.logout(req.user.id);

      res.json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Get current user (protected route)
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  }
);

module.exports = router;
