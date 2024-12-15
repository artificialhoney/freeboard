import { createGraphQLError } from "graphql-yoga";
import { ensureThatUserIsLogged } from "../auth.js";
import Dashboard from "../models/Dashboard.js";

import { transformDashboard } from "./merge.js";

export default {
  Query: {
    dashboard: async (parent, { _id }, context, info) => {
      const res = await Dashboard.findOne({ _id });

      if (res && res.published) {
        return { ...transformDashboard(res), user: context.user._id };
      } else if (!res.published) {
        ensureThatUserIsLogged(context);
        if (context.user._id === res.user) {
          return transformDashboard(res);
        } else {
          createGraphQLError("Dashboard not found");
        }
      } else {
        createGraphQLError("Dashboard not found");
      }
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

      const res = await Dashboard.findOne({ _id, user: context.user._id });

      if (res) {
        return Dashboard.findByIdAndUpdate(
          _id,
          { $set: { ...dashboard } },
          { new: true },
        ).then(transformDashboard);
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
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      },
    },
  },
};
