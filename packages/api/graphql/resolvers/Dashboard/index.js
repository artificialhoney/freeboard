import Dashboard from "../../../server/models/Dashboard";

import { transformDashboard } from "../merge";

export default {
  Query: {
    dashboard: async (parent, { _id }, context, info) => {
      return await Dashboard.findOne({ _id }).exec();
    },
    dashboards: async (parent, args, context, info) => {
      const res = await Dashboard.find({}).populate().exec();

      return res.map((u) => ({
        _id: u._id.toString(),
        title: u.title,
        body: u.body,
        published: u.published,
        date: u.date,
      }));
    },
  },
  Mutation: {
    createDashboard: async (parent, { dashboard }, context, info) => {
      const newDashboard = await new Dashboard({
        title: dashboard.title,
        body: dashboard.body,
        published: dashboard.published,
        date: dashboard.date,
      });
      let createdDashboard;
      try {
        // const result = await newDashboard.save();
        const result = await new Promise((resolve, reject) => {
          newDashboard.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        createdDashboard = transformDashboard(result);
        return createdDashboard;
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
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteDashboard: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the dashboard and deleting it from the list
        const dashboard = await Dashboard.findById(_id);
        return new Promise((resolve, reject) => {
          Dashboard.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res);
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
