const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../config/db");
const { users } = require("../models/user.model");
const { eq } = require("drizzle-orm");

class AuthService {
  async signup(email, password) {
    try {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length) {
        throw new Error("User already exists with this email");
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const newUser = await db
        .insert(users)
        .values({
          email,
          password: hashedPassword,
        })
        .returning({
          id: users.id,
          email: users.email,
          createdAt: users.createdAt,
        });

      return newUser[0];
    } catch (error) {
      throw error;
    }
  }

  generateTokens(userId) {
    const payload = { id: userId };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId, refreshToken) {
    try {
      await db.update(users).set({ refreshToken }).where(eq(users.id, userId));
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      // Verify refresh token
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Find user with this refresh token
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, payload.id))
        .limit(1);

      if (!user.length || user[0].refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      // Generate new tokens
      const tokens = this.generateTokens(user[0].id);

      // Save new refresh token
      await this.saveRefreshToken(user[0].id, tokens.refreshToken);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user[0].id,
          email: user[0].email,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(userId) {
    try {
      await db
        .update(users)
        .set({ refreshToken: null })
        .where(eq(users.id, userId));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
