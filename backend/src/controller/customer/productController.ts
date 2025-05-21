import { Request, Response } from "express";
import { products } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import handleEmptyResult from "../../utils/handleEmptyResult";
import validateRequiredFields from "../../utils/validateRequiredFields";
import isNotANumber from "../../utils/isNotANumber";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const result = await db.select().from(products);
    if (handleEmptyResult(result, res, "No products found.", 200, true)) return;

    const cleanProducts = result.map((product) => ({
      ...product,
      imageUrl: product.imageUrl?.split('/').pop()
    }))

    res.status(200).json({ success: true, products: cleanProducts })
  } catch (error) {
    res.status(500).json({ success: false, error, message: "Internal server error. " })
  }
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;

  if (validateRequiredFields(res, [productId])) return;

  const parsedId = Number(productId)
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const result = await db.select().from(products).where(eq(products.id, parsedId))

    if (handleEmptyResult(result, res, "Product not found.", 200, true)) return;

    res.status(200).json({ success: true, product: result })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
  }
}




//for viewing/browsing only