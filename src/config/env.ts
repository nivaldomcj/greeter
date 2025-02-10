import z from "zod";
import { generateErrorMessage } from "zod-error";

const envSchema = z.object({
  // Environment
  PORT: z.string().optional().default("3000"),

  // Database
  DATABASE_URL: z.string(),

  // Email
  // TIP: Use ethereal mail for testing
  MAIL_HOST: z.string().default("smtp.ethereal.email"),
  MAIL_PORT: z.string().transform((val) => Number(val)),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),

  // Inngest
  CLIENT_ID: z.string().default("greeter"),
});

export const ENV = envSchema.parse(process.env);

export const validateEnv = (): z.ZodIssue[] | void => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const issues = result.error.issues as z.ZodIssue[];
    const options = { delimiter: { error: "\n" } };
    console.error(generateErrorMessage(issues, options));
    process.exit(-1);
  }
};
