import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (values: { name?: string; email: string; password: string }) => {
    try {
      setError("");
      const auth = await api.login({ email: values.email, password: values.password });
      saveAuth(auth);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-copy">
        <p className="eyebrow">JobTrackr AI</p>
        <h1>A cleaner place to track every role, status, and next step.</h1>
        <p>Start simple with auth, protected CRUD, dashboard counts, and room for AI features next.</p>
      </div>
      <div>
        <AuthForm mode="login" onSubmit={handleLogin} error={error} />
        <p className="auth-link">New here? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
