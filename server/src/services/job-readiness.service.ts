export const calculateReadiness = (
  userSkills: { name: string; level: number }[],
  requiredSkills: string[]
) => {
  const skillMap = new Map(
    userSkills.map((s) => [s.name.toLowerCase(), s.level])
  );

  let matched = 0;
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of requiredSkills) {
    if (skillMap.has(skill.toLowerCase())) {
      matched++;
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  const score = Math.round(
    (matched / requiredSkills.length) * 100
  );

  return { score, matchedSkills, missingSkills };
};
