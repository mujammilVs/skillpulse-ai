import { useState } from "react";

function Dashboard() {
  const [result, setResult] = useState<any>(null);

  const checkReadiness = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:5000/jobs/frontend",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Job Readiness</h2>
      <button onClick={checkReadiness}>
        Check Frontend Readiness
      </button>

      {result && (
        <div>
          <p>
            <strong>{result.role}</strong> — {result.score}%
          </p>

          <p>Matched Skills:</p>
          <ul>
            {result.matchedSkills.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p>Missing Skills:</p>
          <ul>
            {result.missingSkills.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
