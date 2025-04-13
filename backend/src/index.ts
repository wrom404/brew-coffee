import express, { Express } from "express";
import path from "path";
import dotenv from "dotenv"
import logger from "./middleware/log/logger";
import cors from 'cors'
import notFoundRoute from "./middleware/error/notFoundHandler";
import errorHandler from "./middleware/error/errorHandler";
import authUserRoutes from "./routes/auth/authRoutes";
import customerProductRoutes from "./routes/customer/productRoutes";
import adminProductRoutes from "./routes/admin/productRoutes";
import adminCustomerRoutes from "./routes/admin/customerRoutes"

dotenv.config()
const app: Express = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.use("/uploads", express.static(path.resolve(__dirname, "./uploads/products")));

// authentication routes
app.use('/api/auth', authUserRoutes)

// customer routes
app.use('/api/customer/product', customerProductRoutes)

// admin routes 
app.use('/api/admin/product', adminProductRoutes)
app.use('/api/admin/customer', adminCustomerRoutes)

// 404 "not found" routes
app.use(notFoundRoute)

// Error handler (500)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})

