import { Request, Response } from "express";
import { products } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    const result = await db.select().from(products);

    if (result.length === 0) {
      res.status(400).json({ success: false, message: "No products found." });
      return;
    }

    res.status(200).json({ success: true, products: result })
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error. " })
    return;
  }
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;

  if (!productId) {
    res.status(400).json({ success: false, message: "No product id provided." })
    return;
  }

  const parseId = Number(productId)

  if (isNaN(parseId)) {
    res.status(400).json({ success: false, message: "Invalid id" })
    return;
  }

  try {
    const queryProduct = await db.select().from(products).where(eq(products.id, parseId))

    if (queryProduct.length === 0) {
      res.status(400).json({ success: false, message: "Product not found" })
    }

    res.status(200).json({ success: true, product: queryProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}




// Customer-specific actions