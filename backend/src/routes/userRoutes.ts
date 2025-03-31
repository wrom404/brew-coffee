import express from "express";
import { getUser, signupUser, loginUser, logoutUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const routes = express.Router();

routes.post('/sign-up', signupUser)

routes.post('/login', loginUser)

routes.post('/logout', logoutUser)

routes.get('/user', authMiddleware, getUser)

export default routes

