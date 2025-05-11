import { Request, Response } from "express";
import { db } from "../../db";
import { eq, inArray, and, desc } from "drizzle-orm";
import validateRequiredFields from "../../utils/validateRequiredFields";
import isNotANumber from "../../utils/isNotANumber";
import { cartItems, orderItems, orders, products } from "../../db/schema";
import handleEmptyResult from "../../utils/handleEmptyResult";

export async function placeOrderProduct(req: Request, res: Response) {
  const { customerId } = req.params;
  const { selectedCartProductIds, paymentMethod, message } = req.body;

  if (validateRequiredFields(res, [customerId, selectedCartProductIds, paymentMethod, message])) return;

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return;

  if (!Array.isArray(selectedCartProductIds) || selectedCartProductIds.length === 0) {
    res.status(400).json({ success: false, message: "No product id selected." })
    return;
  }
  if (!selectedCartProductIds.every((id: any) => typeof id === 'number')) {
    res.status(400).json({ success: false, message: "Cart product ID must be numbers." });
    return;
  }

  try {
    let newOrderId: number | null = null;
    let orderedProducts: typeof cartItems.$inferSelect[] = [];

    await db.transaction(async (tx) => {
      const selectedProducts = await tx.select()
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

      const [insertedOrder] = await tx.insert(orders).values({
        userId: parsedId,
        totalAmount: totalAmount.toString(),  // convert totalAmount to string because decimal expects it
        status: "Pending",
        paymentMethod,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning({ id: orders.id });

      newOrderId = insertedOrder.id;

      for (const item of selectedProducts) {
        orderedProducts.push(item);

        await tx.insert(orderItems).values({
          orderId: insertedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.amount, //use amount from cart
          size: item.size,  // optional if you include 'size' field in order_items table
          createdAt: new Date(),
          updatedAt: new Date()
        });

        const product = await tx.select().from(products).where(eq(products.id, item.productId));

        if (handleEmptyResult(product, res)) return;
        const currentStock = product[0].stockQuantity;

        // ✅ Check if currentStock is null or insufficient
        if (currentStock === null || currentStock < item.quantity) {
          res.status(400).json({
            success: false,
            message:
              currentStock === null
                ? `Stock quantity is not set for product ${item.productId}`
                : `Insufficient stock for product ${item.productId}`,
          });
          return;
        }

        await tx.update(products).set({ stockQuantity: currentStock - item.quantity }).where(eq(products.id, item.productId));
      }

      // 5. Delete the checked-out cart items
      await tx.delete(cartItems)
        .where(inArray(cartItems.id, selectedCartProductIds));
    })

    if (!newOrderId) {
      res.status(400).json({ success: false, message: "Failed to place order." })
      return;
    }

    // 6. Respond success
    res.status(201).json({ success: true, message: "Order placed successfully.", orderId: newOrderId, orderedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error })
  }
}

export async function getActiveOrder(req: Request, res: Response) {
  const { customerId } = req.params;

  if (validateRequiredFields(res, [customerId])) return;

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return;

  try {
    // 1. Fetch orders
    const activeOrders = await db.select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, parsedId),
          inArray(orders.status, ["Pending", "Preparing", "Delivering"])
        )
      )
      .orderBy(desc(orders.createdAt));

    if (activeOrders.length === 0) {
      res.status(200).json({ success: true, orders: [] });
      return;
    }

    // 2. Fetch all orderItems for these orders
    const orderIds = activeOrders.map(order => order.id);

    // This query selects all items belonging to the customer's orders.
    // It gets details from the 'order_items' table and joins with the 'products' table
    // to also fetch the product name (instead of just product IDs).
    // We use 'inArray' to only fetch order items for the customer's specific orders.
    // This helps the customer easily view their order details including product names, quantity, size, and price.
    const orderItemsData = await db.select({
      orderId: orderItems.orderId,
      productId: orderItems.productId,
      quantity: orderItems.quantity,
      price: orderItems.price,
      size: orderItems.size,
      productName: products.name, // join products table
      productImage: products.imageUrl
    })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(inArray(orderItems.orderId, orderIds));

    // 3. Group items under each order
    const ordersWithItems = activeOrders.map(order => ({
      ...order,
      items: orderItemsData.filter(item => item.orderId === order.id)
    }));

    res.status(200).json({ success: true, orders: ordersWithItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}

export async function getOrderHistory(req: Request, res: Response) {
  const { customerId } = req.params;

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return;

  try {
    // 1. Fetch orders
    const activeOrders = await db.select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, parsedId),
          inArray(orders.status, ["Delivered", "Completed", "Cancelled"])
        )
      )
      .orderBy(desc(orders.createdAt));

    if (activeOrders.length === 0) {
      res.status(200).json({ success: true, orders: [] });
      return;
    }

    // 2. Fetch all orderItems for these orders
    const orderIds = activeOrders.map(order => order.id);

    // This query selects all items belonging to the customer's orders.
    // It gets details from the 'order_items' table and joins with the 'products' table
    // to also fetch the product name (instead of just product IDs).
    // We use 'inArray' to only fetch order items for the customer's specific orders.
    // This helps the customer easily view their order details including product names, quantity, size, and price.
    const orderItemsData = await db.select({
      orderId: orderItems.orderId,
      productId: orderItems.productId,
      quantity: orderItems.quantity,
      price: orderItems.price,
      size: orderItems.size,
      productName: products.name, // join products table
      productImage: products.imageUrl
    })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(inArray(orderItems.orderId, orderIds));

    // 3. Group items under each order
    const ordersWithItems = activeOrders.map(order => ({
      ...order,
      items: orderItemsData.filter(item => item.orderId === order.id)
    }));

    res.status(200).json({ success: true, orders: ordersWithItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}
