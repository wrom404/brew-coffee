import { Request, Response } from "express";
// import path from "path";
// import fs from 'fs/promises'
import { products } from "../../db/schema";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import deletePhoto from "../../utils/deletePhoto";
import validateRequiredFields from "../../utils/validateRequiredFields";
import handleEmptyResult from "../../utils/handleEmptyResult";
import isNotANumber from "../../utils/isNotANumber";

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, stockQuantity } = req.body;
  const imageUrl = req.file ? `../../uploads/products${req.file.filename}` : null;

  if (validateRequiredFields(res, [name, description, price, stockQuantity, imageUrl])) return;

  try {
    const newProduct = await db.insert(products).values({ name, description, price, imageUrl, stockQuantity }).returning();
    if (handleEmptyResult(newProduct, res, "Failed to create product.")) return;

    res.status(201).json({ success: true, data: newProduct });
    return;
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal server error.", error });
    return;
  }
}

export async function getAllProducts(req: Request, res: Response): Promise<void> {
  // try {
  //   const uploadDir = path.join(__dirname, "../../uploads/products"); // Correct path

  //   const files = await fs.readdir(uploadDir); // Use promises

  //   const filesUrls = files.map(
  //     (file) => `http://localhost:4000/uploads/products/${file}`
  //   );

  //   res.status(200).json({ success: true, filesUrls });
  //   return;
  // } catch (error) {
  //   console.log("error: ", error)
  //   res.status(500).json({ success: false, message: "Internal server error", error })
  //   return;
  // }
  try {
    const queryProducts = await db.select().from(products);
    if (handleEmptyResult(queryProducts, res, "no products found.")) return;

    res.status(200).json({ success: true, products: queryProducts })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;

  if (validateRequiredFields(res, [productId], "Product ID is required and must be valid.")) return;

  const parseId = Number(productId)
  if (isNotANumber(parseId, res)) return;

  try {
    const queryProduct = await db.select().from(products).where(eq(products.id, parseId))
    if (handleEmptyResult(queryProduct, res, "No product found.")) return;

    res.status(200).json({ success: true, product: queryProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;

  if (validateRequiredFields(res, [productId], "Product ID is required and must be valid.")) return;

  const parseId = Number(productId);
  if (isNotANumber(parseId, res)) return;

  try {
    const queryProduct = await db.select().from(products).where(eq(products.id, parseId))
    if (handleEmptyResult(queryProduct, res, "No product found.")) return;

    deletePhoto(queryProduct[0].imageUrl || "");

    const deletedProduct = await db.delete(products).where(eq(products.id, parseId)).returning();
    if (handleEmptyResult(deletedProduct, res, "Failed to delete product.")) return;

    res.status(200).json({ success: true, deletedProduct, message: "Product successfully deleted" })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;
  const { name, description, price, stockQuantity } = req.body;
  const imageUrl = req.file ? `../../uploads/products${req.file.filename}` : null;

  if (validateRequiredFields(res, [name, description, price, stockQuantity, imageUrl])) return;

  const parseId = Number(productId)
  if (isNotANumber(parseId, res)) return;

  try {
    const queryProduct = await db.select().from(products).where(eq(products.id, parseId));
    if (handleEmptyResult(queryProduct, res, "No product found.")) return;

    deletePhoto(queryProduct[0].imageUrl || "")

    const result = await db.update(products).set({ name, description, price, imageUrl, stockQuantity }).where(eq(products.id, parseId)).returning();
    if (handleEmptyResult(result, res, "Failed to update product.")) return;

    res.status(200).json({ success: true, updatedProduct: result, message: "Product updated successfully." })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

// Admin-specific product handling (add, update, delete)