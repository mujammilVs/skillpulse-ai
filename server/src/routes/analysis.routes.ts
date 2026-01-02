import { Router } from "express";
import { analyzeGithub } from "../controllers/analysis.controller";
import authMiddleware from "../middleware/auth.middleware";
import RepoActivity from "../models/RepoActivity";
const router = Router();

router.post("/github", authMiddleware, analyzeGithub);

router.get("/github", authMiddleware, async (req: any, res: any) => {
  const data = await RepoActivity.find({ userId: req.user.userId });
  res.json(data);
});


export default router;
