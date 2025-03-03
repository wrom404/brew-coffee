import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.db_port,
});

async function connectDb() {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log("Error", error.message);
  }
}

connectDb();

export default pool;
