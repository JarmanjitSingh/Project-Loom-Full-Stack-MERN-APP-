import { NextFunction, Request, Response } from "express";
import { UserType } from "../models/user.js";

export type CatchAsyncErrorsType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type NewUserRequestBody = {
  name?: string;
  email: string;
  emailVerification?: boolean;
  photoURL?: string;
  googleUID?: string;
  password?: string;
};

export type GoogleLoginRequestBody = {
  email: string;
  googleUID: string;
};

export type PasswordLoginRequestBody = {
  email: string;
  password: string;
};

export interface AuthenticatedRequest extends Request {
  user?: any;
}
