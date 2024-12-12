import { createGraphQLError } from "graphql-yoga";
import User from "./models/User.js";
import { config } from "./config.js";
import jwt from "jsonwebtoken";

export const ensureLimitOfUsersIsNotReached = (
  numberOfCurrentlyUsersRegistered,
) => {
  const usersLimit = config.userLimit;
  if (usersLimit === 0) {
    return;
  }

  if (numberOfCurrentlyUsersRegistered >= usersLimit) {
    throw createGraphQLError(
      "The maximum number of users allowed has been reached. You must contact the administrator of the service in order to register",
    );
  }
};

export const ensureThatUserIsLogged = (context) => {
  if (!context.user) {
    throw createGraphQLError(
      "You must be logged in to perform this action",
      {},
    );
  }
};

export const ensureThatUserIsAdministrator = (context) => {
  if (!context.user || !context.user.admin) {
    throw createGraphQLError(
      "You must be an administrator to perform this action",
    );
  }
};

export const getUser = async (context) => {
  if (!context.user) {
    return null;
  }

  const _id = context.user._id || null;
  const user = await User.findOne({ _id }).lean();
  if (!user) {
    throw createGraphQLError("You must be logged in to perform this action");
  }

  return user;
};

export const createAuthToken = (email, admin, active, _id) => {
  return jwt.sign({ email, admin, active, _id }, config.jwtSecret, {
    expiresIn: config.jwtTimeExpiration,
  });
};

export const validateAuthToken = async (token) => {
  const user = await jwt.verify(token, config.jwtSecret);
  return user;
};
