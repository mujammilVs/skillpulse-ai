import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    localStorage.setItem("token", token);
  }, [navigate]);

  return <h2>Login successful 🎉</h2>;
}

export default Dashboard;
