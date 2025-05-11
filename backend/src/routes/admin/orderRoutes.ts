import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import authorizeRole from "../../middleware/auth/authorizeRole";
import { getAllOrder, updateOrderStatus } from "../../controller/admin/orderController";

const routes = express.Router();

routes.use(authMiddleware)

routes.use(authorizeRole)

routes.get('/', getAllOrder)

routes.patch('/:orderId', updateOrderStatus)

export default routes;