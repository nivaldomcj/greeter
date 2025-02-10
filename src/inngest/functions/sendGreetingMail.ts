import { ENV } from "config/env";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "drizzle/schema";
import { client } from "inngest/client";
import { Mailer } from "libs/mailer";
import postgres from "postgres";

export const sendGreetingMail = client.createFunction(
  { id: "send-greeting-mail" },
  { event: "greeter/send-greeting-mail" },
  async ({ event, step }) => {
    await step.run("send-mail", async () => {
      const mailer = new Mailer();
      const connection = postgres(ENV.DATABASE_URL);
      const database = drizzle(connection, { schema });

      await mailer.sendMail({
        to: event.data.email,
        subject: "Hello",
        text: event.data.message,
      });

      await database
        .update(schema.greetings)
        .set({ deliveredAt: new Date() })
        .where(eq(schema.greetings.email, event.data.email));

      await connection.end();
    });

    return true;
  }
);
