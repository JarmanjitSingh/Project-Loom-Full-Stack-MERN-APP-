import { NextFunction, Request, Response } from "express";

export type CatchAsyncErrorsType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
