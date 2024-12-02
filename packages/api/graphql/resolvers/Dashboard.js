import Dashboard from "../../server/models/Dashboard.js";

import { transformDashboard } from "./merge.js";

export default {
  Query: {
    dashboard: async (parent, { _id }, context, info) => {
      const res = await Dashboard.findOne({ _id });

      return res ? transformDashboard(res) : null;
    },
    dashboards: async (parent, args, context, info) => {
      const res = await Dashboard.find({}).populate().exec();

      return res.map(transformDashboard);
    },
  },
  Mutation: {
    createDashboard: async (parent, { dashboard }, context, info) => {
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
      });
      try {
        return newDashboard.save().then(transformDashboard);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateDashboard: async (parent, { _id, dashboard }, context, info) => {
      return Dashboard.findByIdAndUpdate(
        _id,
        { $set: { ...dashboard } },
        { new: true },
      ).then(transformDashboard);
    },
    deleteDashboard: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the dashboard and deleting it from the list
        return Dashboard.findByIdAndDelete(_id).then(transformDashboard);
      } catch (error) {
        console.log(error);
        throw error;
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
