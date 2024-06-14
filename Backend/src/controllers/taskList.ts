import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Tasklist } from "../models/taskList.js";
import { Project } from "../models/project.js";

export const createTaskList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, projectId } = req.body;

    if (!title || !projectId)
      return next(new ErrorHandler("Please fill all required fields", 400));

    const projectExist = await Project.findById(projectId);

    if (!projectExist)
      return next(new ErrorHandler("Project is not exist", 400));

    const newTaskList = await Tasklist.create({
      title,
      description,
      projectId,
    });

    if (!newTaskList)
      return next(
        new ErrorHandler("Something went wrong while creating task list", 500)
      );

    res.status(201).json({
      success: true,
      message: "Task list created.",
    });
  }
);