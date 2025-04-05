import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { createProduct, getAllProducts, getProductById, deleteProduct } from "../../controller/admin/productController";
import authorizeRole from "../../middleware/auth/authorizeRole";
import { upload } from "../../middleware/upload/uploadMiddleware";

const routes = express.Router();

routes.use(authMiddleware)

routes.use(authorizeRole)

routes.get('/', getAllProducts)

routes.post('/create-product', upload.single('photo'), createProduct)

routes.get('/:productId', getProductById)

routes.delete('/:productId', deleteProduct)

export default routes;