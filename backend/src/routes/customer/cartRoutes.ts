import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { addToCart, deleteProductCart, getAllProductCart } from "../../controller/customer/cartController";


const routes = express.Router();

routes.use(authMiddleware)

routes.post('/:customerId/add', addToCart)

routes.get("/:customerId", getAllProductCart)

routes.delete("/:cartProductId", deleteProductCart)

export default routes;