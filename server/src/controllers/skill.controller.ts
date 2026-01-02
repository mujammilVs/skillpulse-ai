import RepoActivity from "../models/RepoActivity";
import SkillProfile from "../models/Skillprofile";
import { aggregateSkills } from "../services/skill-aggregator.service";

export const buildSkillProfile = async (req: any, res: any) => {
  const userId = req.user.userId;

  const repos = await RepoActivity.find({ userId });
  if (!repos.length) {
    return res.status(400).json({ message: "No repo data found" });
  }

  const skills = aggregateSkills(repos);

  const profile = await SkillProfile.findOneAndUpdate(
    { userId },
    { skills },
    { upsert: true, new: true }
  );

  res.json(profile);
};

export const getSkillProfile = async (req: any, res: any) => {
  const userId = req.user.userId;
  const profile = await SkillProfile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({ message: "Skill profile not found" });
  }

  res.json(profile);
};
