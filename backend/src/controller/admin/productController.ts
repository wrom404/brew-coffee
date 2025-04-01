import { Request, Response } from "express";
import { products } from "../../db/schema";
import { db } from "../../db/index";

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, imageUrl, stockQuantity } = req.body;

  if (!name || !description || !price || !imageUrl || !stockQuantity) {
    res.status(400).json({ success: false, message: "Validation error" })
  }

  try {
    const newProduct = await db.insert(products).values({ name, description, price, imageUrl, stockQuantity }).returning();

    if (newProduct.length === 0) {
      res.status(400).json({ success: false, message: "Insert Query error." })
      return;
    }

    res.status(201).json({ success: true, data: newProduct });
    return;
  } catch (error) {
    res.status(201).json({ success: false, error });
    return;
  }
}

// Admin-specific product handling (add, update, delete)