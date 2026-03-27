import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { ApplicationStatus, JobApplication, JobApplicationPayload } from "../types";

const filters: Array<ApplicationStatus | "ALL"> = ["ALL", "SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

function ApplicationsPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | "ALL">("ALL");
  const [error, setError] = useState("");

  const loadApplications = async (status: ApplicationStatus | "ALL" = activeFilter) => {
    if (!token) {
      return;
    }
    try {
      setError("");
      const data = await api.getApplications(token, status);
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load applications");
    }
  };

  useEffect(() => {
    loadApplications(activeFilter);
  }, [token, activeFilter]);

  const handleSave = async (payload: JobApplicationPayload, applicationId?: string) => {
    if (!token) {
      return;
    }
    try {
      setError("");
      if (applicationId) {
        await api.updateApplication(token, applicationId, payload);
      } else {
        await api.createApplication(token, payload);
      }
      setSelectedApplication(null);
      await loadApplications(activeFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save application");
    }
  };

  const handleDelete = async (applicationId: string) => {
    if (!token) {
      return;
    }
    try {
      setError("");
      await api.deleteApplication(token, applicationId);
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication(null);
      }
      await loadApplications(activeFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete application");
    }
  };

  return (
    <Layout>
      <section className="page-header">
        <div>
          <p className="eyebrow">Applications</p>
          <h2>Track roles, notes, and momentum</h2>
        </div>
        <div className="filter-row">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "filter-chip active" : "filter-chip"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>
      {error && <p className="error-text">{error}</p>}
      <div className="applications-layout">
        <ApplicationForm
          selectedApplication={selectedApplication}
          onSubmit={handleSave}
          onCancelEdit={() => setSelectedApplication(null)}
        />
        <section className="panel">
          <div className="panel-header">
            <h2>Your list</h2>
            <span>{applications.length} items</span>
          </div>
          <div className="application-list">
            {applications.length === 0 && <p className="muted">No applications yet for this filter.</p>}
            {applications.map((application) => (
              <article className="application-card" key={application.id}>
                <div>
                  <div className="card-topline">
                    <h3>{application.companyName}</h3>
                    <span className={`status-badge ${application.status.toLowerCase()}`}>{application.status}</span>
                  </div>
                  <p>{application.jobTitle}</p>
                  <p className="muted">{application.location || "Location not added"} • Score {application.healthScore}</p>
                </div>
                <div className="card-actions">
                  <button className="secondary-button" onClick={() => setSelectedApplication(application)}>Edit</button>
                  <button className="ghost-button" onClick={() => handleDelete(application.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ApplicationsPage;
