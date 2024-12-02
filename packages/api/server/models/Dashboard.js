import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import * as shortid from "shortid";

const Schema = mongoose.Schema;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const DashboardSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    title: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    datasources: {
      type: [Object],
      required: false,
    },
    columns: {
      type: Number,
      required: false,
    },
    width: {
      type: String,
      required: false,
      default: "md",
    },
    panes: {
      type: [Object],
      required: false,
    },
    layout: {
      type: [Object],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Dashboard", DashboardSchema);
