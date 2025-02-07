import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

new Elysia()
  // Swagger
  .use(swagger())
  // OK...
  .get("/", () => "OK")
  // ...GO!
  .listen(3000, (server) => {
    console.log(
      `🦊 Elysia is running at http://${server?.hostname}:${server?.port}`
    );
  });
