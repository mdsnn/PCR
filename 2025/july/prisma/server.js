const express = require("express");
const { PrismaClient } = require("@prisma/client");
const yup = require("yup");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const productSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

// Create product
app.post("/products", async (req, res) => {
  try {
    const validatedData = await productSchema.validate(req.body);
    const product = await prisma.product.create({ data: validatedData });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all products
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Read one product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const validatedData = await productSchema.validate(req.body);
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: validatedData,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
