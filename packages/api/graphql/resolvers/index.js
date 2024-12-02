import { mergeResolvers } from "merge-graphql-schemas";

import Dashboard from "./Dashboard.js";

const resolvers = [Dashboard];

export default mergeResolvers(resolvers);
