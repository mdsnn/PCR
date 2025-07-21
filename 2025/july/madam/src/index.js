require("dotenv").config();
const express = require("express");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
