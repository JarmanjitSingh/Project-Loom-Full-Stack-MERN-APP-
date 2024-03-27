import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.js";
import { AuthenticatedRequest } from "../types/types.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = catchAsyncErrors(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Please login first", 400));

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decodedToken)
      return next(new ErrorHandler("Invalid credentials", 400));

    const user = await User.findById(decodedToken._id);

    if (!user) return next(new ErrorHandler("Please login first", 400));

    req.user = user;
    next();
  }
);
