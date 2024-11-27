require("dotenv").config();
import { createServer } from "http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import mongoose from "mongoose";

import schema from "../graphql/";
import { models } from "./config/db/";

const { mongoURI: db } = process.env;

const pubsub = createPubSub();

const context = {
  models,
  pubsub,
};

// Connect to MongoDB with Mongoose.
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const server = createServer(
  createYoga({
    landingPage: false,
    schema,
    context,
  }),
);

server.listen(process.env.PORT || 4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
