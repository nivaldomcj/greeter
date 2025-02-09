import { swagger } from "@elysiajs/swagger";
import { ENV, validateEnv } from "config/env";
import { setup } from "config/setup";
import { Elysia } from "elysia";

validateEnv();

new Elysia()
  // Setup
  .use(setup)
  // Swagger
  .use(swagger())
  // OK...
  .get("/", () => "OK")
  // ...GO
  .listen(ENV.PORT, (server) => {
    const url = `http://${server?.hostname}:${server?.port}`;
    console.log(`🤝 Greeter is greeting at ${url}`);
  });
