import express from "express";
import { userRegister } from "../controllers/user.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Log in failed",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
        success: true,
        message: "successfully logged in",
        user: req.user
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
   // scope: ["profile", "email"]
}))

router.get("/logout", (req, res)=> {
    req.logout((err)=>{
        if(err){
            return res.status(500).json({
                success: false,
                message: "Logout failed"
            })
        }
        res.redirect(process.env.CLIENT_URL!)
    });
})

router.route("/register").post(userRegister);

export default router;
