import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import mongoose from "mongoose";
import { useGraphQLSSE } from "@graphql-yoga/plugin-graphql-sse";

import schema from "./gql.js";
import { setContext } from "./context.js";
import { config } from "./config.js";
import User from "./models/User.js";

mongoose
  .connect(config.mongoUrl, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

if (config.createAdmin) {
  const admin = await User.findOne({ email: config.adminEmail });
  if (!admin) {
    await new User({
      email: config.adminEmail,
      password: config.adminPassword,
      admin: true,
      active: true,
    }).save();
  }
}

const server = createServer(
  createYoga({
    landingPage: false,
    schema,
    context: setContext,
    plugins: [useGraphQLSSE()],
  }),
);

server.listen(config.port, "0.0.0.0", () => {
  console.info(`Server is running on http://localhost:${config.port}/graphql`);
});
