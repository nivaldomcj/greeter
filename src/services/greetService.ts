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
  static async greet(args: GreetArgs) {
    return "👋";
  }
}
