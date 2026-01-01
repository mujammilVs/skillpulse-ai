import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const githubLogin = (_: any, res: any) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`;
  res.redirect(redirectUrl);
};

export const githubCallback = async (req: any, res: any) => {
  const code = req.query.code;

  const tokenRes = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    { headers: { Accept: "application/json" } }
  );

  const accessToken = tokenRes.data.access_token;

  const userRes = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const githubUser = userRes.data;

  let user = await User.findOne({ githubId: githubUser.id });

  if (!user) {
    user = await User.create({
      githubId: githubUser.id,
      name: githubUser.name,
      email: githubUser.email,
      githubUsername: githubUser.login,
      avatarUrl: githubUser.avatar_url
    });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
};
