import { CookieOptions, Response } from "express";
import { UserType } from "../models/user.js";

export const sendToken = (
  res: Response,
  user: UserType,
  message: string,
  statusCode = 200
) => {
  const token = user.getJWTToken();

  const options: CookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};
