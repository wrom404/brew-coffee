import express from "express";
import { signupUser, loginUser, logoutUser } from "../../controller/auth/authController";

const routes = express.Router();

routes.post('/sign-up', signupUser)

routes.post('/login', loginUser)

routes.post('/logout', logoutUser)

export default routes

// Shared authentication routes