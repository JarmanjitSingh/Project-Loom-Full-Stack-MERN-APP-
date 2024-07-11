import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Group } from "../models/group.js";
import { Invitations } from "../models/invitations.js";
import { User } from "../models/user.js";
import {
  AuthenticatedRequest,
  GoogleLoginRequestBody,
  NewUserRequestBody,
  PasswordLoginRequestBody,
} from "../types/types.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const userRegister = catchAsyncErrors(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, name, photoURL, googleUID, groupToken } = req.body;

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

    console.log("user fields", userFields);

    const user = await User.create(userFields);

    if (groupToken) {
      const decodedString = Buffer.from(groupToken, "base64").toString("utf-8");
      const [invitationId, memberId] = decodedString.split("-");

      const member = await Invitations.findOneAndUpdate(
        { _id: invitationId, "members._id": memberId },
        { $set: { "members.$.status": "accepted" } },
        { new: true }
      );

      if (!member)
        return sendToken(
          res,
          user,
          "Error while finding group invitation",
          201
        );
      const addMemberToGroup = await Group.findById(member?.group);

      if (!addMemberToGroup)
        return sendToken(res, user, "Invitation group not found", 201);

      addMemberToGroup?.members.push({ member: user._id as string });
      await addMemberToGroup?.save();
    }

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
    const { _id } = req.user;

    const userGroups = await Group.find({ owner: _id }).populate({
      path: "projects.project",
      model: "Project",
    });

    res.status(200).json({
      success: true,
      user: { ...req.user.toObject(), groups: userGroups },
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

export const updateMyAccount = catchAsyncErrors(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    const file = req.file;

    if (!name || !password || !file)
      return next(new ErrorHandler("Please fill all fields", 400));

    const user = await User.findById(req.user._id);

    if (!user) return next(new ErrorHandler("User not found", 400));

    if (name) user.name = name;
    if (password) user.password = password;
    if (file) user.photoURL = file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      fileurl: `http://localhost:4000/${file.path}`,
    });
  }
);

export const forgetPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) return next(new ErrorHandler("Please provide email", 400));

    const userExist = await User.findOne({ email });

    if (!userExist) return next(new ErrorHandler("User not found", 400));

    const resetToken = userExist.getResetToken();
    await userExist.save();

    //send token via email
    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

   
    sendEmail({
      identifier: "resetPassword",
      to: userExist.email,
      subject: "ProjectLoom Password Reset",
      link: url,
    });

    res.status(200).json({
      success: true,
      message: "Reset link send to email address",
    });
  }
);
