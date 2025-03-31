import express from "express";
import { getUser, signupUser, loginUser, logoutUser } from "../controllers/userController";

const routes = express.Router();

routes.get('/user', getUser)

routes.post('/sign-up', signupUser)

routes.post('/login', loginUser)

routes.post('/logout', logoutUser)

export default routes

