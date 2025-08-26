require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL database");
  release();
});

// Routes

// GET all students
app.get("/api/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY created_at DESC"
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching students",
    });
  }
});

// GET student by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: "Invalid student ID",
      });
    }

    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching student",
    });
  }
});

// POST create new student
app.post("/api/students", validateStudent, async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name.trim(), email.toLowerCase(), age]
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        error: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while creating student",
    });
  }
});

// PUT update student
app.put("/api/students/:id", validateStudent, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: "Invalid student ID",
      });
    }

    const result = await pool.query(
      "UPDATE students SET name = $1, email = $2, age = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [name.trim(), email.toLowerCase(), age, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        error: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while updating student",
    });
  }
});

// DELETE student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: "Invalid student ID",
      });
    }

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error while deleting student",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
