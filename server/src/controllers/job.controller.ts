import SkillProfile from "../models/Skillprofile";
import { JOB_ROLES } from "../config/job-roles";
import { calculateReadiness } from "../services/job-readiness.service";

export const getJobReadiness = async (req: any, res: any) => {
  const userId = req.user.userId;
  const roleKey = req.params.role;

  const role = JOB_ROLES[roleKey as keyof typeof JOB_ROLES];
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  const profile = await SkillProfile.findOne({ userId });
  if (!profile) {
    return res.status(400).json({ message: "Skill profile missing" });
  }

  const result = calculateReadiness(
    profile.skills,
    role.requiredSkills
  );

  res.json({
    role: role.title,
    ...result,
  });
};
