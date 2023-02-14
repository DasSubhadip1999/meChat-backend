const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const sendEmail = require("../../actions/sendEmail");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This user is already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const otp = Math.floor(Math.random() * 9000 + 1000);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
  });

  if (!user) {
    res.status(500);
    throw new Error("Something went wrong while creating account");
  }

  const token = genToken(user._id);
  const subject = "Verification Email";
  const text = "Please verify your email";
  const html = `<p>Your verification otp is ${user.otp}</p>`;

  const emailResponse = await sendEmail(email, subject, text, html); //email, subject, text, html

  if (!emailResponse) {
    res.status(500);
    throw new Error("something went wrong in sending verification email");
  }

  res.status(200);
  res.json({
    name: user.name,
    email: user.email,
    token,
    isVerified: user.isVerified,
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(200);
    res.json({ message: "This account is already verified" });
    return;
  }

  if (req.body.otp == user.otp) {
    const patchResponse = await User.findByIdAndUpdate(user._id, {
      $set: { isVerified: true, otp: 0000 },
    });

    if (!patchResponse) {
      res.status(500);
      throw new Error("something went wrong in otp verification");
    }
  } else {
    res.status(404);
    throw new Error("Wrong OTP");
  }

  res.status(200);
  res.json({ message: "OTP verified successfully" });
});

const loginUser = asyncHandler(async (req, res) => {});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
};
