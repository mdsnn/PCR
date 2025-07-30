// routes/user.js
import express from "express";
import { db } from "../db/index.js";
import { users } from "../schema/users.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", requireAuth, async (req, res) => {
  const clerkUserId = req.auth.userId;

  const user = await db
    .select()
    .from(users)
    .where(users.id.eq(clerkUserId))
    .limit(1);

  if (user.length === 0) {
    return res.status(404).json({ error: "User not found in DB" });
  }

  res.json(user[0]);
});

router.post("/create", requireAuth, async (req, res) => {
  const { email } = req.body;
  const clerkUserId = req.auth.userId;

  try {
    await db.insert(users).values({ id: clerkUserId, email });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
