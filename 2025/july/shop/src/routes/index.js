const express = require("express");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.use("/auth", authRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
