import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { AuthenticatedRequest } from "../types/types.js";
import { Project, ProjectType } from "../models/project.js";
import ErrorHandler from "../middlewares/error.js";
import { Group } from "../models/group.js";
import { Tasklist } from "../models/taskList.js";
import { ObjectId } from "mongoose";

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

    if (!project)
      return next(
        new ErrorHandler("Something went wrong while creating project", 500)
      );

    groupExist.projects.push({ project: project._id as ObjectId });

    const groupPromise = groupExist.save();
    const tasklistPromise = Tasklist.create({
      title: "Task List",
      projectId: project._id,
    });

    await Promise.allSettled([groupPromise, tasklistPromise]);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
  }
);
