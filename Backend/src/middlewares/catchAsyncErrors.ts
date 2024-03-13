import { NextFunction, Request, Response } from "express";
import { CatchAsyncErrorsType } from "../types/types.js";

const catchAsyncErrors = (passedFunction: CatchAsyncErrorsType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(passedFunction(req, res, next)).catch(next);
  };
};

export default catchAsyncErrors;
