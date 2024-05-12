import mongoose, { ObjectId } from "mongoose";
import { UserType } from "./user.js";

export interface GroupType extends Document {
  name: string;
  description?: string;
  owner: ObjectId & UserType;
  members: ObjectId[];
  projects: ObjectId[];
}

const schema = new mongoose.Schema<GroupType>(
  {
    name: {
      type: String,
      required: [true, "Please enter group name"],
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

export const Group = mongoose.model<GroupType>("Group", schema);
