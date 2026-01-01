import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (_, res) => {
  res.send("SkillPulse AI Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
