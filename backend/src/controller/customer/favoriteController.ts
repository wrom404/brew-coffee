// controllers/favoritesController.ts
import { Request, Response } from "express";
import { db } from "../../db";
import { favorites, products } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import validateRequiredFields from "../../utils/validateRequiredFields";
import isNotANumber from "../../utils/isNotANumber";

export async function addFavorite(req: Request, res: Response) {
  const { userId } = req.params;
  const { productId } = req.body;

  if (validateRequiredFields(res, [userId, productId])) return;

  const parsedId = Number(userId);

  if (isNotANumber(parsedId, res)) return;

  try {
    // Check if already exists
    const existing = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, parsedId), eq(favorites.productId, productId)))

    if (existing.length > 0) {
      res.status(400).json({ success: false, message: "Already in favorites" });
      return;
    }

    const inserted = await db.insert(favorites).values({ userId: parsedId, productId }).returning();

    res.status(201).json({ success: true, favorite: inserted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}

export async function removeFavorite(req: Request, res: Response) {
  const { userId } = req.params;
  const { productId } = req.body;

  if (validateRequiredFields(res, [userId, productId])) return;

  const parsedId = Number(userId);

  try {
    const result = await db.transaction(async (tx) => {
      return await tx
        .delete(favorites)
        .where(and(eq(favorites.userId, parsedId), eq(favorites.productId, productId)))
        .returning();
    })

    if (result.length === 0) {
      res.status(404).json({ success: false, message: "Favorite not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}

export async function getUserFavorites(req: Request, res: Response) {
  const { userId } = req.params;

  if (validateRequiredFields(res, [userId])) return;

  const parsedId = Number(userId);

  if (isNotANumber(parsedId, res)) return;

  try {
    const result = await db
      .select({
        id: favorites.id,
        productId: favorites.productId,
        productDetails: products,
      })
      .from(favorites)
      .where(eq(favorites.userId, Number(parsedId)))
      .leftJoin(products, eq(favorites.productId, products.id));

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: "No Favorites found, please add coffee product to your favorites"
      });
      return;
    }

    res.status(200).json({ success: true, favorites: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}
