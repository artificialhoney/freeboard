import { mergeResolvers } from "@graphql-tools/merge";

import Dashboard from "./Dashboard.js";
import User from "./User.js";

const resolvers = [Dashboard, User];

export default mergeResolvers(resolvers);
