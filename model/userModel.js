const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationExpires: {
      type: Date,
      default: () => new Date(+new Date() + 5 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { verificationExpires: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { isVerified: false } }
);

module.exports = mongoose.model("User", userSchema);
