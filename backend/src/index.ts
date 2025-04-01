import express, { Express } from "express";
import dotenv from "dotenv"
import logger from "./middleware/log/logger";
import cors from 'cors'
import authRoutes from "./routes/auth/authRoutes";
import userRoutes from "./routes/user/userRoutes";
import notFoundRoute from "./middleware/error/notFoundHandler";
import errorHandler from "./middleware/error/errorHandler";

dotenv.config()
const app: Express = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.use('/api/auth', authRoutes)

app.use('/api/user', userRoutes)

// 404 "not found" routes
app.use(notFoundRoute)

// Error handler (500)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})

