require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
require("./config/passport.config");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
