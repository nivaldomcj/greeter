import * as schema from "drizzle/schema";
import { Inngest } from "inngest";
import { DB } from "types/db";

interface GreetArgs {
  database: DB;
  inngest: Inngest;
  body: {
    name: string;
    email: string;
  };
}

export abstract class GreetService {
  static async greet({ body, database, inngest }: GreetArgs) {
    const { name, email } = body;
    const message = `Hello ${name}, how are you? :D`;

    const [greeting] = await database
      .insert(schema.greetings)
      .values({ email, message })
      .returning();

    if (!greeting) {
      throw new Error("Failed to create greeting");
    }

    await inngest.send({
      name: "greeter/send-greeting-mail",
      data: { email, message },
    });

    return "👋";
  }
}
