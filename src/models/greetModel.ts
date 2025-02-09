import Elysia, { t } from "elysia";

const GreetRequest = t.Object({
  name: t.String(),
  email: t.String(),
});

const GreetResponse = t.String();

export const GreetModel = new Elysia()
  // Model
  .model({
    "greet.request": GreetRequest,
    "greet.response": GreetResponse,
  });
