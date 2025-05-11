import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { placeOrderProduct, getActiveOrder, getOrderHistory } from "../../controller/customer/orderController";

const routes = express.Router();

routes.use(authMiddleware)

routes.post("/:customerId", placeOrderProduct);

routes.get("/:customerId", getActiveOrder);

routes.get("/:customerId/history", getOrderHistory);

routes.patch("/customerId", )

export default routes;

// View customer order history ✅