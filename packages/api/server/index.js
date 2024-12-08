import { createRequire } from "module";
const require = createRequire(import.meta.url);

require("dotenv").config();
import { createServer } from "http";
import { createPubSub, createYoga } from "graphql-yoga";
import mongoose from "mongoose";

import schema from "./../graphql/index.js";
import { models } from "./config/db/index.js";

const { mongoURI: db, PORT: port } = process.env;

const pubsub = createPubSub();

const context = {
  models,
  pubsub,
};

// Connect to MongoDB with Mongoose.
mongoose
  .connect(db || "mongodb://root:unsecure@localhost:27017", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const server = createServer(
  createYoga({
    landingPage: false,
    schema,
    context,
  }),
);

server.listen(port || 4001, () => {
  console.info(`Server is running on http://localhost:${port || 4001}/graphql`);
});
