import express, { Express } from "express";
import dotenv from "dotenv"
import userRoutes from "./routes/auth/authRoutes";
import logger from "./middleware/log/logger";
import cors from 'cors'

dotenv.config()
const app: Express = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:300', credentials: true }))

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.use('/api/auth', userRoutes)

// app.use('/api', productsRoute);

app.listen(PORT, () => {
  console.log("Server is running at port 4000")
})

