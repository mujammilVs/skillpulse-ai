import { useState } from "react";

function Dashboard() {
  const [skills, setSkills] = useState<any[]>([]);

  const buildSkills = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/skills/build", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSkills(data.skills || []);
  };

  const loadSkills = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/skills", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSkills(data.skills || []);
  };

  return (
    <div>
      <h2>Skills (Rule-Based)</h2>
      <button onClick={buildSkills}>Build Skill Profile</button>
      <button onClick={loadSkills}>Load Skills</button>

      <ul>
        {skills.map((s) => (
          <li key={s.name}>
            {s.name} — {s.level}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
