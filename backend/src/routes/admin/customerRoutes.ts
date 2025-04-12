import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import authorizeRole from "../../middleware/auth/authorizeRole";
import { getAllCustomer } from "../../controller/admin/customerController";

const routes = express.Router();

routes.use(authMiddleware)

routes.use(authorizeRole)

routes.get("/", getAllCustomer);

export default routes