import mongoose, { Document } from "mongoose";
import bcrypt, { compare } from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

export interface UserType extends Document {
  name?: string;
  email: string;
  emailVerification: boolean;
  photoURL?: string;
  googleUID?: string;
  password?: string;
  comparePassword(password: string): Promise<boolean>;
  getJWTToken(): string;
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
      validate: validator.isEmail,
    },
    emailVerification: {
      type: Boolean,
      default: false,
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
      select: false,
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password! = await bcrypt.hash(this.password!, 10);
  next();
});

schema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });
};

export const User = mongoose.model<UserType>("User", schema);
