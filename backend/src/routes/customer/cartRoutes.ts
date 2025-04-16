import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { addToCart, getAllCartProduct } from "../../controller/customer/cartController";


const routes = express.Router();

routes.use(authMiddleware)

routes.post('/:customerId/add', addToCart)

routes.get("/:customerId", getAllCartProduct)

export default routes;