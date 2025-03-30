import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config();
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is missing! Set it in your .env file.");
  process.exit(1); // Exit the process to prevent further execution
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: databaseUrl },
});
