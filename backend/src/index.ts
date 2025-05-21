import express, { Express } from "express";
import path from "path";
import dotenv from "dotenv"
import logger from "./middleware/log/logger";
import cors from 'cors'
import cookieParser from "cookie-parser";
import notFoundRoute from "./middleware/error/notFoundHandler";
import errorHandler from "./middleware/error/errorHandler";
import authUserRoutes from "./routes/auth/authRoutes";

import adminProductRoutes from "./routes/admin/productRoutes";
import adminCustomerRoutes from "./routes/admin/customerRoutes"
import adminOrderRoutes from "./routes/admin/orderRoutes"

import customerProductRoutes from "./routes/customer/productRoutes";
import customerCartRoutes from "./routes/customer/cartRoutes"
import customerProfileRoutes from "./routes/customer/profileRoutes"
import customerOrderRoutes from "./routes/customer/orderRoutes"
import customerFavoriteRoutes from "./routes/customer/favoriteRoutes";

dotenv.config()
const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(cookieParser())

/**
 * Serve product images statically from the 'uploads/products' directory
 * - Maps HTTP requests to /uploads/products/:filename to physical files
 * - Example: GET localhost:4000/uploads/products/coffee.jpg serves ./uploads/products/coffee.jpg, this will be use in the frontend img tag to display an image to that file path
 * - Security: Files are read-only and accessible via exact path matching
 */
app.use("/uploads/products", express.static(path.join(__dirname, "uploads", "products")));

// authentication routes
app.use('/api/auth', authUserRoutes)

// customer routes
app.use('/api/customer/product', customerProductRoutes)
app.use('/api/customer/cart', customerCartRoutes)
app.use('/api/customer/profile', customerProfileRoutes)
app.use('/api/customer/order', customerOrderRoutes)
app.use('/api/customer/favorite', customerFavoriteRoutes)

// admin routes 
app.use('/api/admin/product', adminProductRoutes)
app.use('/api/admin/customer', adminCustomerRoutes)
app.use('/api/admin/order', adminOrderRoutes)

// 404 "not found" routes
app.use(notFoundRoute)

// Error handler (500)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})

