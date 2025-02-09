import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "drizzle/schema";

export type DB = PostgresJsDatabase<typeof schema>;
