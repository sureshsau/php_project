import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, minlength: 4,default:null },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    googleId: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    profileImage:{
      type:String,
      default:"https://thumbs.dreamstime.com/b/default-profile-picture-icon-high-resolution-high-resolution-default-profile-picture-icon-symbolizing-no-display-picture-360167031.jpg"
    },
    role: { type: String, enum: ["user", "admin","writer"], default: "user" },
    verificationCode: { type: String, default: null },
    verificationCodeExpiresAt: {
      type: Date,
      default: null, // Expires in 3 mins
      expires: 600, // TTL Index (MongoDB auto deletes after 10 minutes)
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordTokenExpiresAt: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
