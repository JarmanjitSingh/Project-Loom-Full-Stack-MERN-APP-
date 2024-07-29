import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Tasklist } from "../models/taskList.js";
import { Project } from "../models/project.js";
import { Tasks } from "../models/tasks.js";
import mongoose from "mongoose";
import { Group } from "../models/group.js";

export const createTaskList = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, projectId } = req.body;

    if (!title || !projectId)
      return next(new ErrorHandler("Please fill all required fields", 400));

    const projectExist = await Project.findById(projectId);

    if (!projectExist)
      return next(new ErrorHandler("Project is not exist", 400));

    const newTaskList = await Tasklist.create({
      title,
      description,
      projectId,
    });

    if (!newTaskList)
      return next(
        new ErrorHandler("Something went wrong while creating task list", 500)
      );

    res.status(201).json({
      success: true,
      message: "Task list created.",
    });
  }
);

export const getAllTasklist = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.body;

    if (!projectId)
      return next(new ErrorHandler("Please provide project id", 400));

    const projectExist = await Project.findById(projectId);

    if (!projectExist)
      return next(new ErrorHandler("Project is not exist", 400));

    const groupMembers = await Group.findById(projectExist.group).populate(
      "members.member"
    );

    // This will return the empty tasklist also
    // const tasklist = await Tasklist.aggregate([
    //   {
    //     $match: { projectId: new mongoose.Types.ObjectId(projectId) },
    //   },
    //   {
    //     $lookup: {
    //       from: "tasks",
    //       localField: "_id",
    //       foreignField: "tasklistId",
    //       as: "tasks",
    //     },
    //   },
    // ]);

    const tasklist = await Tasklist.aggregate([
      {
        $match: { projectId: new mongoose.Types.ObjectId(projectId) },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "tasklistId",
          as: "tasks",
        },
      },
      {
        $unwind: {
          path: "$tasks",
          preserveNullAndEmptyArrays: true, // This will keep tasklist documents even if there are no tasks
        },
      },
      {
        $group: {
          _id: {
            tasklistId: "$_id",
            title: "$title",
            projectId: "$projectId",
          },
          noProgressTasks: {
            $push: {
              $cond: [
                { $eq: ["$tasks.status", "no progress"] },
                "$tasks",
                "$$REMOVE",
              ],
            },
          },
          inProgressTasks: {
            $push: {
              $cond: [
                { $eq: ["$tasks.status", "in progress"] },
                "$tasks",
                "$$REMOVE",
              ],
            },
          },
          completedTasks: {
            $push: {
              $cond: [
                { $eq: ["$tasks.status", "completed"] },
                "$tasks",
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: "$_id.tasklistId",
          title: "$_id.title",
          projectId: "$_id.projectId",
          noProgressTasks: 1,
          inProgressTasks: 1,
          completedTasks: 1,
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    if (!tasklist) return next(new ErrorHandler("Something went wrong", 500));

    res.status(200).json({
      success: true,
      tasklist,
      groupMembers: groupMembers?.members,
    });
  }
);

export const editTasklist = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, title, description } = req.body;

    if (!id) return next(new ErrorHandler("Tasklist id is not found", 400));

    const tasklist = await Tasklist.findByIdAndUpdate(id, {
      title,
      description,
    });

    if(!tasklist) return next(new ErrorHandler("Tasklist is not found", 400));

    res.status(201).json({
      success: true,
      message: "Task list updated."
    })
  }
);
