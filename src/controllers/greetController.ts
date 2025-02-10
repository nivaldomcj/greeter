import { setup } from "config/setup";
import { Elysia } from "elysia";
import { GreetModel } from "models/greetModel";
import { GreetService } from "services/greetService";

export const greetController = new Elysia()
  // Setup
  .use(setup)
  // Model
  .use(GreetModel)
  // Routes
  .post(
    "/greet",
    async ({ body, database, inngest }) => {
      return await GreetService.greet({ body, database, inngest });
    },
    {
      body: "greet.request",
      response: "greet.response",
      detail: {
        summary: "Greet a user",
        tags: ["greet"],
      },
    }
  );
