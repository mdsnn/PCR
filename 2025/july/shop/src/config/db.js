const { drizzle } = require("drizzle-orm/neon-serverless");
const { Pool } = require("pg");
const { users, refreshTokens } = require("../models/user.model");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const db = drizzle(pool, { schema: { users, refreshTokens } });

module.exports = db;
