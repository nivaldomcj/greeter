import Elysia from "elysia";
import { serve } from "inngest/bun";
import { client } from "./client";
import functions from "./functions";

// Functions from Inngest should be served through a HTTP endpoint
// see: https://www.inngest.com/docs/learn/serving-inngest-functions
export const inngestController = new Elysia()
  .decorate("client", client)
  .decorate("functions", functions)
  .all(
    "/inngest",
    // Currently, Inngest did not have first class support for ElysiaJS,
    // But, at least, it has support for Bun. So we can serve it this way.
    // see: https://github.com/inngest/inngest-js/blob/main/examples/bun
    async ({ client, functions, request }) => {
      return await serve({ client, functions })(request);
    }
  );
