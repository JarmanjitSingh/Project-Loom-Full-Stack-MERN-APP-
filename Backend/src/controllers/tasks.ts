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

export const deleteTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (!id) return next(new ErrorHandler("Task id is not provide", 400));

    const task = await Tasks.findByIdAndDelete(id);

    if(!task) return next(new ErrorHandler("Task is not found", 404));

    res.status(200).json({
      success: true,
      message: "Task deleted."
    })
  }
);  

export const editTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      id,
      title,
      description,
      assignedTo,
      status,
      startDate,
      dueDate,
      priority,
    } = req.body;

    if (!id) return next(new ErrorHandler("Task id is not provided", 400));

    const task = await Tasks.findByIdAndUpdate(id, {
      title,
      description,
      assignedTo,
      status,
      startDate,
      dueDate,
      priority,
    });

    if(!task) return next(new ErrorHandler("Task is not found", 404));

    res.status(200).json({
      success: true,
      message: "Task updated."
    })
  }
);  