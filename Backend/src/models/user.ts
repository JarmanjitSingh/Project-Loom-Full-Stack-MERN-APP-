import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import validator from "validator";
import crypto from "crypto";

export interface UserType extends Document {
  name?: string;
  email: string;
  emailVerification: boolean;
  photoURL?: string;
  googleUID?: string;
  password?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
  comparePassword(password: string): Promise<boolean>;
  getJWTToken(): string;
  getResetToken(): string;
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
      // unique: true,
    },
    password: {
      type: String,
      select: false,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password! = await bcrypt.hash(this.password!, 10);

  if (this.name) this.name = this.name.trim();
  if (this.email) this.email = this.email.trim();
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

schema.methods.getResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //we are setting users resetPassword token in schema

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // and seting expire schema for reset password 15min

  return resetToken;
};

export const User = mongoose.model<UserType>("User", schema);
