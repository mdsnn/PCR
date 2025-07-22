const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = require("../config/database");
const {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../validations/authValidation");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const router = express.Router();

// Sign up
router.post("/signup", async (req, res) => {
  try {
    // Validate input
    await signupSchema.validate(req.body);
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Validate input
    await loginSchema.validate(req.body);
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Refresh token
router.post("/refresh", async (req, res) => {
  try {
    await refreshTokenSchema.validate(req.body);
    const { refreshToken } = req.body;

    // Find refresh token
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Check if token is expired
    if (new Date() > storedToken.expiresAt) {
      // Delete expired token
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });

      return res.status(401).json({
        success: false,
        message: "Refresh token expired",
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken(storedToken.userId);

    res.json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Logout
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (refreshToken) {
        // Delete specific refresh token
        await prisma.refreshToken.deleteMany({
          where: {
            token: refreshToken,
            userId: req.user.id,
          },
        });
      } else {
        // Delete all refresh tokens for user
        await prisma.refreshToken.deleteMany({
          where: {
            userId: req.user.id,
          },
        });
      }

      res.json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Protected route example
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          email: req.user.email,
        },
      },
    });
  }
);

module.exports = router;
