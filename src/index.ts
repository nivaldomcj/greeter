import { swagger } from "@elysiajs/swagger";
import { ENV, validateEnv } from "config/env";
import { setup } from "config/setup";
import { greetController } from "controllers/greetController";
import { Elysia } from "elysia";
import { inngestController } from "inngest/controller";

validateEnv();

new Elysia()
  // Setup
  .use(setup)
  // Controllers
  .use(greetController)
  // Inngest
  .use(inngestController)
  // Swagger
  .use(swagger())
  // OK...
  .get("/", () => "OK")
  // ...GO
  .listen(ENV.PORT, (server) => {
    const url = `http://${server?.hostname}:${server?.port}`;
    console.log(`🤝 Greeter is greeting at ${url}`);
  });
