import { createRequire } from "module";
const require = createRequire(import.meta.url);

require("dotenv").config();
import { createServer } from "http";
import { createPubSub, createYoga } from "graphql-yoga";
import mongoose from "mongoose";

import schema from "./../graphql/index.js";
import { models } from "./config/db/index.js";

const { FREEBOARD_MONGO_URL: db, PORT: port } = {
  FREEBOARD_MONGO_URL: "mongodb://freeboard:unsecure@localhost:27017",
  PORT: 4001,
  ...process.env,
};

const pubsub = createPubSub();

const context = {
  models,
  pubsub,
};

// Connect to MongoDB with Mongoose.
mongoose
  .connect(db, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const server = createServer(
  createYoga({
    landingPage: false,
    schema,
    context,
  }),
);

server.listen(port, "0.0.0.0", () => {
  console.info(`Server is running on http://localhost:${port}/graphql`);
});
