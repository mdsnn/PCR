require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const yup = require("yup");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL database");
  release();
});

// Create students table (run this once)
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INTEGER NOT NULL CHECK (age > 0 AND age < 150),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Students table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// Initialize table
createTable();

// Yup validation schemas
const studentSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(1, "Name must not be empty")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .required("Email is required"),
  age: yup
    .number()
    .integer("Age must be an integer")
    .min(1, "Age must be at least 1")
    .max(149, "Age must be less than 150")
    .required("Age is required"),
});

const idSchema = yup.object({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive number")
    .required("ID is required"),
});

// Validation middleware using Yup
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.errors,
    });
  }
};

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
app.get("/api/students/:id", validate(idSchema), async (req, res) => {
  try {
    const { id } = req.params;

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
app.post("/api/students", validate(studentSchema), async (req, res) => {
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
app.put(
  "/api/students/:id",
  validate(
    yup.object({
      params: idSchema,
      body: studentSchema,
    })
  ),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;

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
  }
);

// DELETE student
app.delete("/api/students/:id", validate(idSchema), async (req, res) => {
  try {
    const { id } = req.params;

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
