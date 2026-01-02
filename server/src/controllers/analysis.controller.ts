import RepoActivity from "../models/RepoActivity";
import { fetchRepos, fetchRepoLanguages } from "../services/github.service";

export const analyzeGithub = async (req: any, res: any) => {
  try {
    const { githubToken } = req.body;
    const userId = req.user.userId;

    if (!githubToken) {
      return res.status(400).json({ message: "GitHub token missing" });
    }

    console.log("Starting GitHub analysis for user:", userId);

    const repos = await fetchRepos(githubToken);
    console.log("Repos fetched:", repos.length);

    for (const repo of repos) {
      const languages = await fetchRepoLanguages(
        repo.owner.login,
        repo.name,
        githubToken
      );

      await RepoActivity.create({
        userId,
        repoName: repo.name,
        languages,
        commits: repo.size,
        updatedAt: repo.updated_at,
      });

      console.log("Saved repo:", repo.name);
    }

    res.json({ message: "GitHub metadata analyzed successfully" });
  } catch (error: any) {
    console.error(
      "GitHub analysis failed:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "GitHub analysis failed",
    });
  }
};
