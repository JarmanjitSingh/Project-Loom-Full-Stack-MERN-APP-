import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const userRegister = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    return res.json({
      message: "hello",
    });
  }
);
