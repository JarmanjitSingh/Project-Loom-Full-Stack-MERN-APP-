import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import {
  AuthenticatedRequest,
  GoogleLoginRequestBody,
  NewUserRequestBody,
  PasswordLoginRequestBody,
} from "../types/types.js";
import { sendToken } from "../utils/sendToken.js";

export const userRegister = catchAsyncErrors(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, name, photoURL, googleUID } = req.body;

   // console.log("body", req.body);

    if (!email)
      return next(new ErrorHandler("Please enter your email address", 400));

    const isExist = await User.findOne({ email });

    if (isExist)
      return next(new ErrorHandler("This email already exists", 400));

    const userFields = {
      email,
      name,
      photoURL,
      googleUID,
      emailVerification: !!googleUID, // If googleUID is present, set emailVerification to true
    };

    console.log("user fields", userFields)

    const user = await User.create(userFields);

    sendToken(res, user, "User created", 201);
  }
);

export const LoginWithPassword = catchAsyncErrors(
  async (
    req: Request<{}, {}, PasswordLoginRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Please fill all fields", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Account is not exist", 400));
    if (!user?.password)
      return next(
        new ErrorHandler("Reset your password or login with google", 400)
      );

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch)
      return next(new ErrorHandler("Email or password is invalid", 400));

    sendToken(res, user, "Login successfully", 200);
  }
);

export const LoginWithGoogle = catchAsyncErrors(
  async (
    req: Request<{}, {}, GoogleLoginRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, googleUID } = req.body;

    if (!email || !googleUID)
      return next(new ErrorHandler("Please fill all fields", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("Account is not exist", 400));
    if (!user?.googleUID || user?.googleUID !== googleUID)
      return next(new ErrorHandler("Invalid Credentials", 400));

    sendToken(res, user, "Login successfully", 200);
  }
);

export const getMyProfile = catchAsyncErrors(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

export const logoutUser = catchAsyncErrors(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "none",
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User logged out",
      });
  }
);
