import Dashboard from "../../../server/models/Dashboard";

import { transformDashboard } from "../merge";

export default {
  Query: {
    dashboard: async (parent, { _id }, context, info) => {
      const res = await Dashboard.findOne({ _id }).exec();

      return transformDashboard(res);
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
        body: dashboard.body,
        published: dashboard.published,
        headerImage: dashboard.headerImage,
        datasources: dashboard.datasources,
        userColumns: dashboard.userColumns,
        panes: dashboard.panes,
        maxWidth: dashboard.maxWidth,
      });
      try {
        // const result = await newDashboard.save();
        return new Promise((resolve, reject) => {
          newDashboard.save((err, res) => {
            err ? reject(err) : resolve(transformDashboard(res));
          });
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateDashboard: async (parent, { _id, dashboard }, context, info) => {
      return new Promise((resolve, reject) => {
        Dashboard.findByIdAndUpdate(
          _id,
          { $set: { ...dashboard } },
          { new: true },
        ).exec((err, res) => {
          err ? reject(err) : resolve(transformDashboard(res));
        });
      });
    },
    deleteDashboard: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the dashboard and deleting it from the list
        return new Promise((resolve, reject) => {
          Dashboard.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(transformDashboard(res));
          });
        });
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
