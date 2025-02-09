import { swagger } from "@elysiajs/swagger";
import { ENV, validateEnv } from "config/env";
import { Elysia } from "elysia";

validateEnv();

new Elysia()
  // Swagger
  .use(swagger())
  // OK...
  .get("/", () => "OK")
  // ...GO!
  .listen(ENV.PORT, (server) => {
    console.log(
      `🤝 Greeter is greeting at http://${server?.hostname}:${server?.port}`
    );
  });
