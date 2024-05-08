import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Group } from "../models/group.js";
import { InvitationType, Invitations } from "../models/invitations.js";
import { AuthenticatedRequest } from "../types/types.js";

export const inviteUsers = catchAsyncErrors(
    async (
      req: AuthenticatedRequest & Request<{}, {}, InvitationType>,
      res: Response,
      next: NextFunction
    ) => {
      const { group: groupId, members } = req.body;
  
      if (
        !groupId ||
        !members ||
        !Array.isArray(members) ||
        members.length === 0
      )
        return next(new ErrorHandler("Please fill required fields", 400));
  
        const group = await Group.findById(groupId);
        if(!group) return next(new ErrorHandler("Group not found", 404));

        const invitation = await Invitations.findOne({group: groupId});

        if(invitation){
            invitation.members.push(...members);
            await invitation.save();
        }else{
            await Invitations.create({
                group: groupId,
                members
            })
        }
  
      res.status(201).json({
        success: true,
        message: "Members invited",
      });
    }
  );
  