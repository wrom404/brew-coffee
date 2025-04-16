import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { addToCart } from "../../controller/customer/cartController";


const routes = express.Router();

routes.use(authMiddleware)

routes.post('/:customerId/add', addToCart)

export default routes;