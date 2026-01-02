import mongoose from "mongoose";

const repoActivitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    repoName: String,
    languages: Object,
    commits: Number,
    updatedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("RepoActivity", repoActivitySchema);
