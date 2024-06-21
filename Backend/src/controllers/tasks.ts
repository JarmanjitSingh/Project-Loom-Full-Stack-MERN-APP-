import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Tasks } from "../models/tasks.js";

export const createTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      tasklistId,
      title,
      description,
      assignedTo,
      status,
      startDate,
      dueDate,
      priority,
    } = req.body;

    if (!tasklistId || !title)
      return next(new ErrorHandler("Please fill all required fields", 400));

    const task = await Tasks.create({
      tasklistId,
      title,
      description,
      assignedTo,
      status,
      startDate,
      dueDate,
      priority,
    })

    res.status(201).json({
      success: true,
      message: "Task created.",
    });
  }
);
