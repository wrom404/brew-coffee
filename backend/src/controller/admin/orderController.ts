import { Request, Response } from "express";
import { db } from "../../db";
import { orders } from "../../db/schema";
import handleEmptyResult from "../../utils/handleEmptyResult";
import isNotANumber from "../../utils/isNotANumber";
import { eq } from "drizzle-orm";

export async function getAllOrder(req: Request, res: Response): Promise<void> {

  try {
    const result = await db.select().from(orders);

    if (handleEmptyResult(result, res)) return;

    res.status(200).json({ success: true, allOrders: result })
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
    return;
  }
}

// PATCH /orders/:orderId/status

export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Arrived', 'Completed', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ success: false, message: "Invalid order status" });
    return;
  }

  const parsedId = Number(orderId);
  if (isNotANumber(parsedId, res)) return;

  try {
    const result = await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, parsedId))
      .returning();

    if (result.length === 0) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }

    res.status(200).json({ success: true, updatedOrder: result[0], message: "Order status updated" });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
    return;
  }
}
