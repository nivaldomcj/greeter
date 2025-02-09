import { ENV } from "config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "drizzle/schema";
import path from "path";
import postgres from "postgres";

export const connection = postgres(ENV.DATABASE_URL);
export const db = drizzle(connection, { schema });

await migrate(db, { migrationsFolder: path.resolve(__dirname, "migrations") });
await connection.end();
