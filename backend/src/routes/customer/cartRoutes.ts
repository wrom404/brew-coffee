import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { addToCart, deleteProductCart, getAllProductCart, updateCartProduct } from "../../controller/customer/cartController";


const routes = express.Router();

routes.use(authMiddleware)

routes.post('/:customerId/add', addToCart)

routes.get("/:customerId", getAllProductCart) // use to view cart

routes.delete("/:cartProductId", deleteProductCart)

routes.put("/:cartProductId", updateCartProduct)

export default routes;