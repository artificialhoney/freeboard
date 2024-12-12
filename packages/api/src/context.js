import { createPubSub } from "graphql-yoga";
import { validateAuthToken } from "./auth.js";
import User from "./types/User.js";
import Dashboard from "./types/Dashboard.js";

export const setContext = async ({ req }) => {
  const context = {
    pubsub: createPubSub(),
    models: {
      Dashboard,
      User,
    },
  };

  let token = req.headers["authorization"];

  if (token && typeof token === "string") {
    try {
      const authenticationScheme = "Bearer ";
      if (token.startsWith(authenticationScheme)) {
        token = token.slice(authenticationScheme.length, token.length);
      }
      const user = await validateAuthToken(token);
      context.user = user; // Add to Apollo Server context the user who is doing the request if auth token is provided and it's a valid token
    } catch (e) {
      console.warn(e);
    }
  }

  return context;
};
