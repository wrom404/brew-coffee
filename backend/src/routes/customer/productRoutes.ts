import express from "express";
// import authMiddleware from "../../middleware/auth/authMiddleware";
import { getAllProducts, getProductById } from "../../controller/customer/productController";

const routes = express.Router();

// routes.use(authMiddleware)

routes.get('/', getAllProducts)

routes.get('/:productId', getProductById)

export default routes;

// user routes for handling CRUD in their account