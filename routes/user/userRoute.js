const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  verifyEmail,
} = require("../../controller/user/userController");
const auth = require("../../middleware/authMiddleware");
const validator = require("../../middleware/validatorMiddleware");

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(
    body("name").exists({ checkFalsy: true }).withMessage("Please enter name"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length of six"),
    validator,
    registerUser
  );

userRouter
  .route("/verify")
  .patch(
    body("otp").exists({ checkFalsy: true }).withMessage("Please enter otp"),
    auth,
    verifyEmail
  );

userRouter.route("/login").post(loginUser);

module.exports = userRouter;
