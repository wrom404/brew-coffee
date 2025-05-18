import express from "express";
import { signupUser, signInUser, logoutUser } from "../../controller/auth/authController";

const routes = express.Router();

routes.post('/sign-up', signupUser)

routes.post('/sign-in', signInUser)

routes.post('/logout', logoutUser)

export default routes

// Shared authentication routes