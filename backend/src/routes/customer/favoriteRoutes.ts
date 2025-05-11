// routes/favorites.ts
import { Router } from "express";
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from "../../controller/customer/favoriteController";

const routes = Router();

routes.post("/:userId", addFavorite); // POST body: { userId, productId }

routes.delete("/:userId", removeFavorite); // DELETE body: { userId, productId }

routes.get("/:userId", getUserFavorites); // GET /favorites/:userId

export default routes;
