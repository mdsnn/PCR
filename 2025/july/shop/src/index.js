const express = require("express");
const authRoutes = require("./auth.routes");
const { authenticate } = require("../middleware/authenticate");
const router = express.Router();

/**
 * Health check endpoint
 */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

/**
 * API Routes
 */
router.use("/auth", authRoutes);

/**
 * Protected test route (example)
 */
router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user,
  });
});

/**
 * Handle 404 routes
 */
router.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = router;
