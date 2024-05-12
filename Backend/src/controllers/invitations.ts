import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Group } from "../models/group.js";
import { InvitationType, Invitations } from "../models/invitations.js";
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

    invitation.members.forEach((data) => {
      if (members.some(obj => obj.email === data.email)) {
        sendEmail(
          data.email,
          `Project Loom group invitation`,
          "You are invited to the group",
          `${process.env.FRONTEND_URL}/invitation/accept/${invitation._id}/${data._id}`,
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

export const acceptInvitation = async (
  invitaionId: string,
  memberId: string
) => {
  const data = await Invitations.findOneAndUpdate(
    { _id: invitaionId, "members._id": memberId },
    { $set: { "members.$.status": "accepted" } },
    { new: true }
  );
  console.log("updated document", data);
};
