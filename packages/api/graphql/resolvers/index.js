import { mergeResolvers } from "merge-graphql-schemas";

import Dashboard from "./Dashboard/";

const resolvers = [Dashboard];

export default mergeResolvers(resolvers);
