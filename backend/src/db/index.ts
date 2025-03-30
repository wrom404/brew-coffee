import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Throws a clear error before calling drizzle() if DATABASE_URL is missing.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

// Uses pg’s Pool instead of passing the connection string directly.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Exports db for reuse in controllers.
export const db = drizzle(pool)
