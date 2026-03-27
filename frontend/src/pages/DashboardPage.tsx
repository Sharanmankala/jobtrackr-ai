import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { DashboardSummary } from "../types";

function DashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    api.getDashboard(token)
      .then(setSummary)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load dashboard"));
  }, [token]);

  return (
    <Layout>
      <section className="page-header">
        <p className="eyebrow">Dashboard</p>
        <h2>Your application snapshot</h2>
      </section>
      {error && <p className="error-text">{error}</p>}
      <div className="stats-grid">
        <div className="panel stat-card">
          <span>Total</span>
          <strong>{summary?.totalApplications ?? 0}</strong>
        </div>
        {Object.entries(summary?.countsByStatus || {}).map(([status, count]) => (
          <div className="panel stat-card" key={status}>
            <span>{status}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default DashboardPage;
