import mongoose, { Document, ObjectId } from "mongoose";
import validator from "validator";

export interface InvitationType extends Document {
  group: ObjectId;
  members: memberType[];
}

export type memberType = {
  email: string;
  status: "pending" | "accepted";
  role: "admin" | "proUser" | "User" | "guest" | "readonly";
  _id: ObjectId
};
const schema = new mongoose.Schema<InvitationType>(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: [true, "Please enter group id"],
    },
    members: [
      {
        email: {
          type: String,
          required: [true, "Please fill email"],
          validate: validator.isEmail,
        },
        status: {
          type: String,
          enum: ["pending", "accepted"],
          default: "pending",
        },
        role: {
          type: String,
          enum: ["admin", "proUser", "User", "guest", "readonly"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Invitations = mongoose.model<InvitationType>(
  "Invitations",
  schema
);
