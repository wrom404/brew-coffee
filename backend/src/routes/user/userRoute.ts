import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { getCurrentUser } from "../../controller/user/userController";

const routes = express.Router();

routes.get('/', getCurrentUser)

export default routes;