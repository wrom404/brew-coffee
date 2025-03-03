import express from "express";
import "./config/connectDb.js";
import dotenv from "dotenv";
import routes from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.port || 4000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:4000", credentials: true }));

app.use("/auth", routes);

app.listen(PORT, () => {
  console.log("Server is running at port 400");
});
