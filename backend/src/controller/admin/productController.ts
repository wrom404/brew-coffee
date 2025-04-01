import { Request, Response } from "express";
import { products } from "../../db/schema";
import { db } from "../../db/index";

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, stockQuantity } = req.body;
  const imageUrl = req.file ? `../../uploads/products${req.file.filename}` : null;

  if (!name || !description || !price || !stockQuantity || !imageUrl) {
    res.status(400).json({ success: false, message: "All fields are required, including an image." });
    return;
  }

  try {
    const newProduct = await db.insert(products).values({ name, description, price, imageUrl, stockQuantity }).returning();

    if (newProduct.length === 0) {
      res.status(500).json({ success: false, message: "Database insertion failed." });
      return;
    }

    res.status(201).json({ success: true, data: newProduct });
    return;
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal server error.", error });
    return;
  }
}

// Admin-specific product handling (add, update, delete)