import mongoose, { Document, ObjectId } from "mongoose";

export interface ProjectType extends Document {
    name: string;
    description?: string;
    color: string;
    createdBy: ObjectId;
    group: ObjectId;
  }

const schema = new mongoose.Schema<ProjectType>(
  {
    name: {
      type: String,
      required: [true, "Please enter project name"],
    },
    description: {
      type: String,
    },
    color: {
      type: String,
      required: true,
      default: "#D3B9EC"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre('save', function (next) {
  if (this.name)  this.name = this.name.trim();
  if (this.description) this.description = this.description.trim();

  next();
});

export const Project = mongoose.model<ProjectType>("Project", schema);
