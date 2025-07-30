// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
