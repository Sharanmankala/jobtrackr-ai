import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [error, setError] = useState("");

  const handleRegister = async (values: { name?: string; email: string; password: string }) => {
    try {
      setError("");
      const auth = await api.register({
        name: values.name || "",
        email: values.email,
        password: values.password
      });
      saveAuth(auth);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to register");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-copy">
        <p className="eyebrow">JobTrackr AI</p>
        <h1>Build a job search system you can actually keep updated.</h1>
        <p>This starter MVP focuses on strong fundamentals: auth, ownership rules, and application tracking.</p>
      </div>
      <div>
        <AuthForm mode="register" onSubmit={handleRegister} error={error} />
        <p className="auth-link">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
