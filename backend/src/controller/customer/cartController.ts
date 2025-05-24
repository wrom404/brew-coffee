import { Request, Response } from "express";
import { cartItems, products } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import isNotANumber from "../../utils/isNotANumber";
import handleEmptyResult from "../../utils/handleEmptyResult";
import validateRequiredFields from "../../utils/validateRequiredFields";

export async function addToCart(req: Request, res: Response) {
  const { customerId } = req.params;
  const { productId, quantity, size, price } = req.body;

  if (validateRequiredFields(res, [customerId, productId, quantity, size])) return; // Stop execution if required fields are empty

  const parsedId = Number(customerId);
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    // const resultQueryProduct = await db.select().from(products).where(eq(products.id, productId));
    // if (handleEmptyResult(resultQueryProduct, res, "No product found.")) return;

    // const totalAmount = resultQueryProduct.reduce((total: number, item) => {
    //   return total + (Number(item.price) * quantity)
    // }, 0);
    // const totalAmount = Number(price) * quantity

    const fixedAmount = price.toFixed(2);

    const result = await db.insert(cartItems).values({ userId: parsedId, productId, quantity, size, amount: fixedAmount }).returning();;
    if (handleEmptyResult(result, res, "Failed to add product to cart.")) return;

    console.log("result: ", result[0]);

    res.status(200).json({ success: true, product: result[0] })
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error. " })
  }
}

export async function getAllProductCart(req: Request, res: Response) {
  const { customerId } = req.params;

  if (validateRequiredFields(res, [customerId], "Invalid, customer id is null.")) return;

  const parsedId = Number(customerId)
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {

    //     SELECT
    //     cart_items.id,
    //       cart_items.user_id,
    //       cart_items.product_id,
    //       cart_items.quantity,
    //       cart_items.size,
    //       cart_items.amount,
    //       products.name,
    //       products.image_url,
    //       products.price
    //     FROM
    //      cart_items
    //     INNER JOIN
    //      products
    //     ON
    //      cart_items.product_id = products.id;
    // the drizzle query below is equivalent to the raw sql query above
    const result = await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        size: cartItems.size,
        amount: cartItems.amount,
        productName: products.name,
        productImage: products.imageUrl,
        productPrice: products.price,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id));

    if (handleEmptyResult(result, res, "Cart is empty.", 200, true)) return;

    res.status(200).json({ success: true, cartProduct: result });
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
  }
}

export async function deleteProductCart(req: Request, res: Response) {
  const { cartProductId } = req.params;

  if (validateRequiredFields(res, [cartProductId], "Invalid, product id is null.")) return;

  const parsedId = Number(cartProductId);
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid

  try {
    const result: typeof cartItems.$inferSelect[] = await db.transaction(async (tx) => {
      return await tx.delete(cartItems).where(eq(cartItems.id, parsedId)).returning();
    });

    if (result.length === 0) {
      res.status(404).json({ success: false, message: "failed to delete user or user not found." })
      return;
    }

    res.status(200).json({ success: true, deletedCartProduct: result, message: "Deleted successfully." })
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
  }
}

export async function updateCartProduct(req: Request, res: Response) {
  const { cartProductId } = req.params;
  const { quantity, size } = req.body;

  if (validateRequiredFields(res, [cartProductId, quantity, size])) return;

  const parsedId = Number(cartProductId);
  if (isNotANumber(parsedId, res)) return; // Stop execution if invalid 

  try {
    const result = await db.update(cartItems).set({ quantity, size }).where(eq(cartItems.id, parsedId)).returning();

    if (handleEmptyResult(result, res, "Failed to update product in cart.")) return;

    res.status(200).json({ success: true, updatedCartProduct: result, message: "Updated successfully." })
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error." })
  }
}

// Cart and checkout operations