import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Group } from "../models/group.js";
import { InvitationType, Invitations } from "../models/invitations.js";
import { User } from "../models/user.js";
import { AuthenticatedRequest } from "../types/types.js";
import { sendEmail } from "../utils/sendEmail.js";

export const inviteUsers = catchAsyncErrors(
  async (
    req: AuthenticatedRequest & Request<{}, {}, InvitationType>,
    res: Response,
    next: NextFunction
  ) => {
    const { group: groupId, members } = req.body;

    if (!groupId || !members || !Array.isArray(members) || members.length === 0)
      return next(new ErrorHandler("Please fill required fields", 400));

    const group = await Group.findById(groupId).populate("owner");
    if (!group) return next(new ErrorHandler("Group not found", 404));

    let invitation = await Invitations.findOne({ group: groupId });

    if (invitation) {
      const existingMembers = invitation.members.map((data) => data.email);

      members.forEach((data) => {
        if (!existingMembers.includes(data.email)) {
          invitation?.members.push(data);
        }
      });
      await invitation.save();
    } else {
      invitation = await Invitations.create({
        group: groupId,
        members,
      });
    }

    const memberEmails = members.map((data) => data.email);
    const existingUsers = await User.find({ email: { $in: memberEmails } });

    invitation.members.forEach((data) => {
      if (members.some((obj) => obj.email === data.email)) {
        const existingUser = existingUsers.find(
          (user) => user.email === data.email
        );

        if (existingUser) {
          const combinedIds = `${invitation._id}-${data._id}-${existingUser._id}`;
          const token = Buffer.from(combinedIds).toString("base64");

          sendEmail(
            data.email,
            `Project Loom group invitation`,
            "You are invited to the group",
            `${process.env.FRONTEND_URL}/invitation/accept/${token}`,
            `${group.name}`,
            `${group.owner.email}`
          );
        }
      } else {
        const combinedIds = `${invitation._id}-${data._id}`;
        const token = Buffer.from(combinedIds).toString("base64");

        sendEmail(
          data.email,
          `Project Loom group invitation`,
          "You are invited to the group",
          `${process.env.FRONTEND_URL}/register/${token}`,
          `${group.name}`,
          `${group.owner.email}`
        );
      }
    });

    res.status(201).json({
      success: true,
      message: "Members invited",
    });
  }
);

export const acceptInvitation = catchAsyncErrors(
  async (
    req: AuthenticatedRequest & Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.params;
    const decodedString = Buffer.from(token, "base64").toString("utf-8");
    const [invitationId, memberId, userId] = decodedString.split("-");

    console.log(invitationId, memberId, userId);

    if (!invitationId || !memberId || !userId)
      return next(new ErrorHandler("Invalid token", 400));

    if (req.user._id.toString() !== userId)
      return next(
        new ErrorHandler(
          "You are not able to join with this account. Please login with the invitee email",
          400
        )
      );

    const member = await Invitations.findOneAndUpdate(
      { _id: invitationId, "members._id": memberId },
      { $set: { "members.$.status": "accepted" } },
      { new: true }
    );

    if (!member) return next(new ErrorHandler("Invitation not found", 404));

    const addMemberToGroup = await Group.findById(member?.group);

    if (!addMemberToGroup)
      return next(new ErrorHandler("Group not found", 404));

    if (
      addMemberToGroup.members.some((obj) => obj.member.toString() === userId)
    )
      return next(new ErrorHandler("Invitation already accepted", 400));

    addMemberToGroup?.members.push({ member: userId });
    await addMemberToGroup?.save();

    res.status(201).json({
      success: true,
      message: "Invitation accepted",
    });
  }
);


export const testing = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction)=>{

const a = Buffer.from(`663fc46b589ead054217a3b6-66409140dab066b032f7c0e9`).toString("base64")
console.log(a)

  res.status(200).json({
    success: true,
    message: "Hakunamatata"
  })
})