import { Request, Response } from "express";
import { db } from "../../db";
import { eq, inArray, and, desc } from "drizzle-orm";
import validateRequiredFields from "../../utils/validateRequiredFields";
import isNotANumber from "../../utils/isNotANumber";
import { cartItems, orderItems, orders } from "../../db/schema";
import handleEmptyResult from "../../utils/handleEmptyResult";
import { isArray } from "util";


export async function checkOutProduct(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;
  const { selectedCartProductIds } = req.body;

  if (validateRequiredFields(res, [customerId, selectedCartProductIds])) return;

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return;

  if (!Array.isArray(selectedCartProductIds) || selectedCartProductIds.length === 0) {
    res.status(400).json({ success: false, message: "No product id selected." })
    return;
  }

  try {
    const selectedProducts = await db.select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, parsedId),
          inArray(cartItems.id, selectedCartProductIds) // match the cart id from the selectedCartProductIds (array of product id from cart)
        )
      );

    if (handleEmptyResult(selectedProducts, res)) return;

    // 2. Calculate total amount from 'amount' field
    const totalAmount = selectedProducts.reduce((sum, item) => {
      return sum + parseFloat(item.amount.toString());
    }, 0);

    console.log("totalAmount: ", totalAmount)

    const [newOrder] = await db.insert(orders).values({
      userId: parsedId,
      totalAmount: totalAmount.toString(),  // convert totalAmount to string because decimal expects it
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    // 4. Insert each cart item into 'order_items'
    const orderItemsData = selectedProducts.map(item => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.amount, // use amount from cart
      size: item.size, // optional if you include 'size' field in order_items table
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const orderedProduct = await db.insert(orderItems).values(orderItemsData).returning();

    // 5. Delete the checked-out cart items
    await db.delete(cartItems)
      .where(inArray(cartItems.id, selectedCartProductIds));

    // 6. Respond success
    res.status(201).json({ success: true, message: "Order placed successfully.", orderId: newOrder.id, orderedProduct });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

export async function getActiveOrder(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return;

  try {
    const result = await db.select().from(orders).where(and(eq(orders.userId, parsedId), inArray(orders.status, ["Pending", "Preparing"]))).orderBy(desc(orders.createdAt));
    if (handleEmptyResult(result, res, "No active order found.")) return;

    console.log("active order: ", result);
    res.status(200).json({ success: true, activeOrder: result })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

export async function getOrderHistory(req: Request, res: Response): Promise<void> {
  const { customerId } = req.params;

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return;

  try {
    const result = await db.select().from(orders).where(and(eq(orders.userId, parsedId), inArray(orders.status, ["Completed", "Cancelled"]))).orderBy(desc(orders.createdAt));

    if (handleEmptyResult(result, res, "No order history yet.")) return;

    console.log("order history: ", result);
    res.status(200).json({ success: true, orderHistory: result })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}
