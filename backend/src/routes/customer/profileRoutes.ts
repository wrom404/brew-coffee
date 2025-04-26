import express from "express";
import authMiddleware from "../../middleware/auth/authMiddleware";
import { getUserProfile, updateCustomerProfile } from "../../controller/customer/profileController";

const routes = express.Router();

routes.use(authMiddleware)

routes.get("/:customerId", getUserProfile)

routes.put("/:customerId", updateCustomerProfile)

export default routes;


// Update user profile
// View Profile