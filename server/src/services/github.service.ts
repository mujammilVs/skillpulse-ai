import axios from "axios";

export const fetchRepos = async (token: string) => {
  const res = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json"
    }
  });

  return res.data;
};

export const fetchRepoLanguages = async (
  owner: string,
  repo: string,
  token: string
) => {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};
