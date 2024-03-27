import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Group, GroupType } from "../models/group.js";
import { AuthenticatedRequest } from "../types/types.js";

export const createGroup = catchAsyncErrors(
  async (
    req: AuthenticatedRequest & Request<{}, {}, GroupType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, members, projects } = req.body;
    console.log("request", req);

    if (!name || !req.user._id)
      return next(new ErrorHandler("Please fill required fields", 400));

    await Group.create({
      name,
      description,
      owner: req.user._id,
      members,
      projects,
    });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
    });
  }
);
