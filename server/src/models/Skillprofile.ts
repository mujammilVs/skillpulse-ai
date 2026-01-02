import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true }, // 0–100
});

const skillProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    skills: [skillSchema],
    source: { type: String, default: "rule-based" },
  },
  { timestamps: true }
);

export default mongoose.model("SkillProfile", skillProfileSchema);
