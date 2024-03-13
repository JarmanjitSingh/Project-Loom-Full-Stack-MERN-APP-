import mongoose, { Document } from "mongoose";

interface UserType extends Document {
  name?: string;
  email: string;
  photoURL?: string;
  googleUID?: string;
  password?: string;
}

const schema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    photoURL: {
      type: String,
    },
    googleUID: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserType>("User", schema);
