import express from "express";
import { getUser, signupUser, loginUser } from "../controllers/userController";

const routes = express.Router();

routes.get('/user', getUser)

routes.post('/sign-up', signupUser)

routes.post('/login', loginUser)

export default routes

