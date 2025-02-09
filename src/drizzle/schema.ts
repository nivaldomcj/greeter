import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const greetings = pgTable("greetings", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deliveredAt: timestamp("delivered_at"),
});
