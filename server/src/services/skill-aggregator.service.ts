type LangMap = Record<string, number>;

export const aggregateSkills = (repoActivities: any[]) => {
  const totals: LangMap = {};

  for (const repo of repoActivities) {
    const langs = repo.languages || {};
    for (const [lang, bytes] of Object.entries(langs)) {
      totals[lang] = (totals[lang] || 0) + (bytes as number);
    }
  }

  const maxBytes = Math.max(...Object.values(totals), 1);

  const skills = Object.entries(totals).map(([name, bytes]) => ({
    name,
    level: Math.round(((bytes as number) / maxBytes) * 100),
  }));

  // Optional: sort desc
  skills.sort((a, b) => b.level - a.level);

  return skills;
};
