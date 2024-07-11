import express from "express";
import {
  LoginWithGoogle,
  LoginWithPassword,
  forgetPassword,
  getMyProfile,
  logoutUser,
  resetPassword,
  updateMyAccount,
  userRegister
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(userRegister);

router.route("/login/google").post(LoginWithGoogle);

router.route("/login/password").post(LoginWithPassword);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/updateMyAccount").post(isAuthenticated, upload.single("file"), updateMyAccount);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword/:token").put(resetPassword);




export default router;
