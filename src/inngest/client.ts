import { ENV } from "config/env";
import { Inngest } from "inngest";

// Inngest client, which sends and receives events
export const client = new Inngest({ id: ENV.CLIENT_ID });
