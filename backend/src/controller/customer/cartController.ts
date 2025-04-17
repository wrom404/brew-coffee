import { Request, Response } from "express";
import { cartItems } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export async function addToCart(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;
  const { productId, quantity, size, notes } = req.body;

  const parsedId = Number(customerId);

  if (isNaN(parsedId)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  if (!customerId || !productId || !quantity || !size) {
    res.status(400).json({ success: false, message: "Invalid, please input all the input fields." })
    return;
  }

  try {
    const result = await db.insert(cartItems).values({ userId: parsedId, productId, quantity, size, notes }).returning();;

    if (result.length === 0) {
      res.status(400).json({ success: false, message: "Error, something went wrong." })
      return;
    }

    res.status(200).json({ success: true, itemAdded: result })
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error. " })
    return;
  }
}

export async function getAllProductCart(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;

  const parsedId = Number(customerId)

  if (isNaN(parsedId)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  try {
    const result = await db.select().from(cartItems).where(eq(cartItems.userId, parsedId))

    if (result.length === 0) {
      res.status(400).json({ success: false, message: "Cart is empty" });
      return;
    }

    res.status(200).json({ success: true, cartProduct: result });
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
    return;
  }
}

export async function deleteProductCart(req: Request, res: Response): Promise<void> {
  const { cartProductId } = req.params;

  if (!cartProductId) {
    res.status(400).json({ success: false, message: "Product id is null." })
    return;
  }

  const parsedId = Number(cartProductId);

  if (isNaN(parsedId)) {
    res.status(400).json({ success: false, message: "Id is not a number." })
    return;
  }

  try {
    const result = await db.delete(cartItems).where(eq(cartItems.id, parsedId)).returning();

    if (result.length === 0) {
      res.status(400).json({ success: false, message: "Something went wrong, invalid Id." })
      return;
    }

    res.status(200).json({ success: true, deletedCartProduct: result, message: "Deleted successfully." })
    return;
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
    return;
  }
}

// Cart and checkout operations