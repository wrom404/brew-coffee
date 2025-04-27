import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { checkOutProduct, getActiveOrder } from "../../controller/customer/orderController";

const routes = express.Router();

routes.use(authMiddleware)

routes.post("/:customerId", checkOutProduct);

routes.get("/:customerId", getActiveOrder);

export default routes;

// View customer order history ✅