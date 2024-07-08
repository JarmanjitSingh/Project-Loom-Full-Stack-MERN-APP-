import { NextFunction, Request, Response } from "express";

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
  groupToken?: string;
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

interface EmailFunctionParams {
  identifier: string;
  to: string;
  subject: string;
  text?: string;
  link?: string;
  projectName?: string;
  senderEmail?: string;
  name?: string;
}

export type EmailTypeFunction = (params: EmailFunctionParams) => void;

export type HtmlTemplateType = (
  link?: string,
  projectName?: string,
  senderEmail?: string,
  name?: string,
  identifier?: string
) => string;
