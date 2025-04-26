import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";

const routes = express.Router();

routes.use(authMiddleware)

// View customer order history ✅