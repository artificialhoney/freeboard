import { createGraphQLError } from "graphql-yoga";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  createAuthToken,
  ensureLimitOfUsersIsNotReached,
  ensureThatUserIsAdministrator,
  ensureThatUserIsLogged,
  getUser,
} from "../auth.js";
import { isStrongPassword, isValidEmail } from "../validators.js";

export default {
  Query: {
    /**
     * It allows to administrators users to list all users registered
     */
    listAllUsers: async (parent, args, context) => {
      ensureThatUserIsLogged(context);

      ensureThatUserIsAdministrator(context);

      const sortCriteria = { admin: "desc", registrationDate: "asc" };
      return User.find().sort(sortCriteria).lean();
    },
  },
  Mutation: {
    /**
     * It allows to users to register as long as the limit of allowed users has not been reached
     */
    registerUser: async (parent, { email, password }, context) => {
      if (!email || !password) {
        throw createGraphQLError("Data provided is not valid");
      }

      if (!isValidEmail(email)) {
        throw createGraphQLError("The email is not valid");
      }

      if (!isStrongPassword(password)) {
        throw createGraphQLError("The password is not secure enough");
      }

      const registeredUsersCount = await User.find().estimatedDocumentCount();

      ensureLimitOfUsersIsNotReached(registeredUsersCount);

      const isAnEmailAlreadyRegistered = await User.findOne({ email }).lean();

      if (isAnEmailAlreadyRegistered) {
        throw createGraphQLError("Data provided is not valid");
      }

      await new User({ email, password }).save();

      const user = await User.findOne({ email }).lean();

      return {
        token: createAuthToken(user.email, user.admin, user.active, user.uuid),
      };
    },
    authUser: async (parent, { email, password }, context) => {
      if (!email || !password) {
        throw createGraphQLError("Invalid credentials");
      }

      const user = await User.findOne({ email, active: true }).lean();

      if (!user) {
        throw createGraphQLError("User not found or login not allowed");
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        throw createGraphQLError("Invalid credentials");
      }

      await User.findOneAndUpdate(
        { email },
        { lastLogin: new Date().toISOString() },
        { new: true },
      ).lean();

      return {
        token: createAuthToken(user.email, user.admin, user.active, user._id),
      };
    },
    deleteMyUserAccount: async (parent, args, context) => {
      ensureThatUserIsLogged(context);

      const user = await getUser(context);

      return User.deleteOne({ uuid: user.uuid });
    },
  },
};
