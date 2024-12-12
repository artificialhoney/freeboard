import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import * as shortid from "shortid";

const Schema = mongoose.Schema;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    registrationDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt((err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model("User", UserSchema);
