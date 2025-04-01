import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { createProduct } from "../../controller/admin/productController";
import authorizeRole from "../../middleware/auth/authorizeRole";

const routes = express.Router();

routes.use(authMiddleware)

routes.use(authorizeRole)

routes.post('/create-product', createProduct)

export default routes;