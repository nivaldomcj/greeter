import z from "zod";
import { generateErrorMessage } from "zod-error";

const envSchema = z.object({
  // Environment
  PORT: z.string().optional().default("3000"),

  // Database
  DATABASE_URL: z.string(),

  // Email
  MAIL_HOST: z.string(),
  MAIL_PORT: z.number(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),
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
