import { mergeResolvers } from "@graphql-tools/merge";

import Dashboard from "./Dashboard.js";

const resolvers = [Dashboard];

export default mergeResolvers(resolvers);
