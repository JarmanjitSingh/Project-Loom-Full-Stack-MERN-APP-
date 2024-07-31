import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { ProjectType } from "./project.js";

export interface TasklistType extends Document {
  title: string;
  description?: string;
  projectId: ProjectType | ObjectId;
  group: ObjectId;

}

const schema = new Schema<TasklistType>(
  {
    title: {
      type: String,
      required: [true, "Tasklist title is required"],
    },
    description: String,
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', function (next) {
  if (this.title)  this.title = this.title.trim();
  if (this.description) this.description = this.description.trim();

  next();
});

export const Tasklist = mongoose.model<TasklistType>("Tasklist", schema);
