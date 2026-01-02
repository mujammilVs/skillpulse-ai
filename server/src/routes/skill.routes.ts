import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { buildSkillProfile, getSkillProfile } from "../controllers/skill.controller";

const router = Router();

router.post("/build", authMiddleware, buildSkillProfile); // compute & save
router.get("/", authMiddleware, getSkillProfile);         // read only

export default router;
