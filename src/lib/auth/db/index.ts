import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/auth/db/schema";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

config({ path: ".env.local" }); // or .env.local

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });
