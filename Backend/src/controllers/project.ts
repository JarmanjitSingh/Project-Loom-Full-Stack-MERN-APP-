import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { AuthenticatedRequest } from "../types/types.js";
import { Project, ProjectType } from "../models/project.js";
import ErrorHandler from "../middlewares/error.js";
import { Group } from "../models/group.js";

export const createProject = catchAsyncErrors(
  async (
    req: AuthenticatedRequest & Request<{}, {}, ProjectType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, color, group } = req.body;

    if (!name || !group || !req.user._id)
      return next(new ErrorHandler("Please fill required fields", 400));

    const groupExist = await Group.findById(group);

    if (!groupExist) return next(new ErrorHandler("Group is not found", 404));

    const project = await Project.create({
      name,
      description,
      color,
      group,
      createdBy: req.user._id,
    });

    groupExist.projects.push({ project: project._id.toString() });
    await groupExist.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
  }
);
