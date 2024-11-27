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
    board: {
      type: Object,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Dashboard", DashboardSchema);
