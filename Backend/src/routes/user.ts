import express from "express";
import {
  LoginWithGoogle,
  LoginWithPassword,
  userRegister,
} from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(userRegister);

router.route("/login/google").post(LoginWithGoogle);

router.route("/login/password").post(LoginWithPassword);

export default router;
