import express, { Express } from "express";
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes";
import cookieParser from 'cookie-parser'

dotenv.config()
const app: Express = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/auth', userRoutes)

// app.use('/api', productsRoute);

app.listen(PORT, () => {
  console.log("Server is running at port 4000")
})

