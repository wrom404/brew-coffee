import { Request, Response } from "express";
import { cartItems, products } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import isNotANumber from "../../utils/isNotANumber";
import handleEmptyResult from "../../utils/handleEmptyResult";
import validateRequiredFields from "../../utils/validateRequiredFields";

export async function addToCart(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;
  const { productId, quantity, size } = req.body;

  if (validateRequiredFields(res, [customerId, productId, quantity, size])) return; // Stop execution if required fields are empty

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const resultQueryProduct = await db.select().from(products).where(eq(products.id, productId));
    if (handleEmptyResult(resultQueryProduct, res, "No product found.")) return;

    const totalAmount = resultQueryProduct.reduce((total: number, item) => {
      return total + (Number(item.price) * quantity)
    }, 0);

    const fixedAmount = totalAmount.toFixed(2);

    const result = await db.insert(cartItems).values({ userId: parsedId, productId, quantity, size, amount: fixedAmount }).returning();;
    if (handleEmptyResult(result, res, "Failed to add product to cart.")) return;

    console.log("result: ", result[0]);

    res.status(200).json({ success: true, product: result[0] })
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error. " })
    return;
  }
}

export async function getAllProductCart(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;

  if (validateRequiredFields(res, [customerId], "Invalid, customer id is null.")) return;

  const parsedId = Number(customerId)
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const result = await db.select().from(cartItems).where(eq(cartItems.userId, parsedId))

    if (handleEmptyResult(result, res, "Cart is empty.")) return;

    res.status(200).json({ success: true, cartProduct: result });
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
    return;
  }
}

export async function deleteProductCart(req: Request, res: Response): Promise<void> {
  const { cartProductId } = req.params;

  if (validateRequiredFields(res, [cartProductId], "Invalid, product id is null.")) return;

  const parsedId = Number(cartProductId);
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const result: typeof cartItems.$inferSelect[] = await db.transaction(async (tx) => {
      return await tx.delete(cartItems).where(eq(cartItems.id, parsedId)).returning();
    });

    if (result.length === 0) {
      res.status(400).json({ success: false, message: "failed to delete user." })
      return;
    }

    res.status(200).json({ success: true, deletedCartProduct: result, message: "Deleted successfully." })
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
    return;
  }
}

export async function updateCartProduct(req: Request, res: Response): Promise<void> {
  const { cartProductId } = req.params;
  const { quantity, size } = req.body;

  if (validateRequiredFields(res, [cartProductId, quantity, size])) return;

  const parsedId = Number(cartProductId);
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid 

  try {
    const result = await db.update(cartItems).set({ quantity, size }).where(eq(cartItems.id, parsedId)).returning();

    if (handleEmptyResult(result, res, "Failed to update product in cart.")) return;

    res.status(200).json({ success: true, updatedCartProduct: result, message: "Updated successfully." })
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
    return;
  }
}

// Cart and checkout operations