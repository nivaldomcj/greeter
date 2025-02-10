import { ENV, validateEnv } from "config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "drizzle/schema";
import { Elysia } from "elysia";
import { client } from "inngest/client";
import { Mailer } from "libs/mailer";
import postgres from "postgres";

validateEnv();

// Email
const mailer = new Mailer();

// Database
const connection = postgres(ENV.DATABASE_URL);
const database = drizzle(connection, { schema });

export const setup = new Elysia({ name: "setup" })
  // Email
  .decorate("mailer", mailer)
  // Database
  .decorate("database", database)
  // Inngest
  .decorate("inngest", client);
