require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const pool = require("./config/database");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Session configuration
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
