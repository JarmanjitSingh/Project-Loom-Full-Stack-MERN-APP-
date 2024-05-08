import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { AuthenticatedRequest } from "../types/types.js";
import { Project, ProjectType } from "../models/project.js";
import ErrorHandler from "../middlewares/error.js";

export const createProject = catchAsyncErrors(
  async (
    req: AuthenticatedRequest & Request<{}, {}, ProjectType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, color, group } = req.body;

    if (!name || !group || !req.user._id)
      return next(new ErrorHandler("Please fill required fields", 400));

    await Project.create({
      name,
      description,
      color,
      group,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
  }
);
 