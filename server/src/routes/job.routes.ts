import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getJobReadiness } from "../controllers/job.controller";

const router = Router();

router.get("/:role", authMiddleware, getJobReadiness);

export default router;
