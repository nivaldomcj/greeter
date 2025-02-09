import * as schema from "drizzle/schema";
import { Mailer } from "libs/mailer";
import { DB } from "types/db";

interface GreetArgs {
  database: DB;
  mailer: Mailer;
  body: {
    name: string;
    email: string;
  };
}

export abstract class GreetService {
  static async greet({ database, mailer, body }: GreetArgs) {
    const message = `Hello ${body.name}, how are you? :D`;

    const [greeting] = await database
      .insert(schema.greetings)
      .values({
        email: body.email,
        message,
        deliveredAt: null,
      })
      .returning();

    if (!greeting) {
      throw new Error("Failed to create greeting");
    }

    // TODO: Send email using inngest & mailer
    return "👋";
  }
}
