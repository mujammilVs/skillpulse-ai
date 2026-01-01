function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div>
      <h1>SkillPulse AI</h1>
      <button onClick={handleLogin}>Continue with GitHub</button>
    </div>
  );
}

export default Login;
