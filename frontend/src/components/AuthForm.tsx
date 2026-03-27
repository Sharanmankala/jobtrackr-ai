import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: (values: { name?: string; email: string; password: string }) => Promise<void>;
  error: string;
};

function AuthForm({ mode, onSubmit, error }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ name, email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="panel auth-form" onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
      <p className="muted">
        {mode === "login" ? "Log in to manage your applications." : "Start tracking roles in one place."}
      </p>
      {mode === "register" && (
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
      )}
      <label>
        Email
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      {error && <p className="error-text">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default AuthForm;
