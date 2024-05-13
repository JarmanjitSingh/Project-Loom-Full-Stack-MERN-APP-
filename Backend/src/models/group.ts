import mongoose, { ObjectId } from "mongoose";
import { UserType } from "./user.js";
import { memberType } from "./invitations.js";
import { ProjectType } from "./project.js";

export interface GroupType extends Document {
  name: string;
  description?: string;
  owner: ObjectId & UserType;
  members: Array<{
    member: ObjectId | string | memberType;
  }>;
  projects: Array<{
    project: ObjectId | string | ProjectType;
  }>;
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
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    projects: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Group = mongoose.model<GroupType>("Group", schema);
