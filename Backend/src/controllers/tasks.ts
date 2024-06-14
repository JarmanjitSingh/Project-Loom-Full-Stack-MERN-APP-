import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
      success: true,
      message: "Task list created.",
    });
  }
);
