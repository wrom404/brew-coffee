import express from "express";
import { getUser } from "../../controller/user/userController";
import authMiddleware from "../../middleware/auth/authMiddleware";

const routes = express.Router();

routes.get('/user', authMiddleware, getUser)

export default routes;

// user routes for handling CRUD in their account