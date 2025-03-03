import express from "express";
import { createUser, getUsers } from "../controller/user.controller.js";

const routes = express.Router();

routes.get('/', getUsers);

routes.post('/sign-up', createUser)

export default routes