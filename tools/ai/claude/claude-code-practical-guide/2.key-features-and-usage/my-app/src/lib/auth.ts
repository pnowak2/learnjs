import { betterAuth } from "better-auth";
import db from "./db";

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
