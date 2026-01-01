import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    githubUsername: String,
    avatarUrl: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
