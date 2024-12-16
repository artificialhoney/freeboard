import { createGraphQLError, createPubSub } from "graphql-yoga";
import { ensureThatUserIsLogged } from "../auth.js";
import Dashboard from "../models/Dashboard.js";

import { transformDashboard } from "./merge.js";

const pubSub = createPubSub();

const getDashboard = (res, context) => {
  if (res) {
    if (context.user) {
      const { user, ...result } = transformDashboard(res);
      if (user === context.user._id) {
        return result;
      } else {
        return { ...result, user };
      }
    } else {
      if (res.published) {
        return transformDashboard(res);
      } else {
        createGraphQLError("Dashboard not found");
      }
    }
  } else {
    createGraphQLError("Dashboard not found");
  }
};

export default {
  Query: {
    dashboard: async (parent, { _id }, context, info) => {
      return getDashboard(await Dashboard.findOne({ _id }), context);
    },
    dashboards: async (parent, args, context, info) => {
      ensureThatUserIsLogged(context);
      const res = await Dashboard.find({ user: context.user._id })
        .populate()
        .exec();

      return res.map(transformDashboard);
    },
  },
  Mutation: {
    createDashboard: async (parent, { dashboard }, context, info) => {
      ensureThatUserIsLogged(context);

      const newDashboard = await new Dashboard({
        title: dashboard.title,
        version: dashboard.version,
        published: dashboard.published,
        image: dashboard.image,
        width: dashboard.width,
        columns: dashboard.columns,
        datasources: dashboard.datasources,
        panes: dashboard.panes,
        layout: dashboard.layout,
        authProviders: dashboard.authProviders,
        settings: dashboard.settings,
        user: context.user._id,
      });
      try {
        return newDashboard.save().then(transformDashboard);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateDashboard: async (parent, { _id, dashboard }, context, info) => {
      ensureThatUserIsLogged(context);

      const res = await Dashboard.findOne({ _id });

      if (res) {
        return Dashboard.findByIdAndUpdate(
          _id,
          { $set: { ...dashboard } },
          { new: true },
        )
          .then((d) => getDashboard(d, context))
          .then((d) => {
            pubSub.publish(`dashboard:${d._id}`, { dashboard: d });
            return d;
          });
      } else {
        createGraphQLError("Dashboard not found");
      }
    },
    deleteDashboard: async (parent, { _id }, context, info) => {
      ensureThatUserIsLogged(context);

      const res = await Dashboard.findOne({ _id, user: context.user._id });

      if (res) {
        return Dashboard.findByIdAndDelete(_id).then(transformDashboard);
      } else {
        createGraphQLError("Dashboard not found");
      }
    },
  },
  Subscription: {
    dashboard: {
      subscribe: (_, args, context) => {
        return pubSub.subscribe(`dashboard:${args._id}`);
      },
    },
  },
};
