import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptInvitation, inviteUsers, testing } from "../controllers/invitations.js";

const router = express.Router();

router.route("/inviteUsers").post(isAuthenticated, inviteUsers);

router.route("/accept/:token").put(isAuthenticated, acceptInvitation);

router.route("/testing").get(isAuthenticated, testing);
 

export default router;
