import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { TasklistType } from "./taskList.js";
import { UserType } from "./user.js";

export interface TaskType extends Document {
  tasklistId: TasklistType | ObjectId;
  title: string;
  description?: string;
  assignedTo?: UserType | ObjectId;
  status: "no progress" | "in progress" | "completed";
  startDate?: Date;
  dueDate?: Date;
  priority: "none" | "low" | "medium" | "high";
  group: ObjectId;
}

const schema = new Schema<TaskType>(
  {
    tasklistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasklist",
      required: [true, "tasklist id is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["no progress", "in progress", "completed"],
      default: "no progress",
    },
    startDate: {
      type: Date,
      // default: Date.now,
    },
    dueDate: {
      type: Date,
      // validate: {
      //   validator: function (this: TaskType, value: Date) {
      //     return !value || value >= this.startDate;
      //   },
      //   message: "Due date must be after start date.",
      // },
    },
    priority: {
      type: String,
      enum: ["none", "low", "medium", "high"],
      default: "none",
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
  if (this.title)  this.title = this.title.trim();
  if (this.description) this.description = this.description.trim();

  next();
});

export const Tasks = mongoose.model<TaskType>("Tasks", schema);
