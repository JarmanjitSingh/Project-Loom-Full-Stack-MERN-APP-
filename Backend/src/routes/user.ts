import express from "express";
import {
  LoginWithGoogle,
  LoginWithPassword,
  getMyProfile,
  logoutUser,
  userRegister,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(userRegister);

router.route("/login/google").post(LoginWithGoogle);

router.route("/login/password").post(LoginWithPassword);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/logout").get(isAuthenticated, logoutUser);

export default router;
