import { FormEvent, useEffect, useState } from "react";
import { ApplicationStatus, JobApplication, JobApplicationPayload } from "../types";

const initialValues: JobApplicationPayload = {
  companyName: "",
  jobTitle: "",
  jobUrl: "",
  status: "SAVED",
  appliedDate: new Date().toISOString().slice(0, 10),
  notes: "",
  location: "",
  salaryRange: "",
  jdSummary: "",
  followupEmail: ""
};

const statuses: ApplicationStatus[] = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

type ApplicationFormProps = {
  selectedApplication: JobApplication | null;
  onSubmit: (payload: JobApplicationPayload, applicationId?: string) => Promise<void>;
  onCancelEdit: () => void;
};

function ApplicationForm({ selectedApplication, onSubmit, onCancelEdit }: ApplicationFormProps) {
  const [formState, setFormState] = useState<JobApplicationPayload>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedApplication) {
      setFormState({
        companyName: selectedApplication.companyName,
        jobTitle: selectedApplication.jobTitle,
        jobUrl: selectedApplication.jobUrl,
        status: selectedApplication.status,
        appliedDate: selectedApplication.appliedDate,
        notes: selectedApplication.notes || "",
        location: selectedApplication.location || "",
        salaryRange: selectedApplication.salaryRange || "",
        jdSummary: selectedApplication.jdSummary || "",
        followupEmail: selectedApplication.followupEmail || ""
      });
    } else {
      setFormState(initialValues);
    }
  }, [selectedApplication]);

  const handleChange = (field: keyof JobApplicationPayload, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formState, selectedApplication?.id);
      if (!selectedApplication) {
        setFormState(initialValues);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <div className="panel-header">
        <h2>{selectedApplication ? "Edit application" : "Add application"}</h2>
        {selectedApplication && (
          <button type="button" className="secondary-button" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}
      </div>
      <label>
        Company name
        <input value={formState.companyName} onChange={(event) => handleChange("companyName", event.target.value)} required />
      </label>
      <label>
        Job title
        <input value={formState.jobTitle} onChange={(event) => handleChange("jobTitle", event.target.value)} required />
      </label>
      <label>
        Job URL
        <input value={formState.jobUrl} onChange={(event) => handleChange("jobUrl", event.target.value)} required />
      </label>
      <label>
        Status
        <select value={formState.status} onChange={(event) => handleChange("status", event.target.value)}>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label>
        Applied date
        <input type="date" value={formState.appliedDate} onChange={(event) => handleChange("appliedDate", event.target.value)} required />
      </label>
      <label>
        Location
        <input value={formState.location} onChange={(event) => handleChange("location", event.target.value)} />
      </label>
      <label>
        Salary range
        <input value={formState.salaryRange} onChange={(event) => handleChange("salaryRange", event.target.value)} />
      </label>
      <label className="full-span">
        Notes
        <textarea rows={4} value={formState.notes} onChange={(event) => handleChange("notes", event.target.value)} />
      </label>
      <label className="full-span">
        AI paste JD section
        <textarea rows={4} value={formState.jdSummary} onChange={(event) => handleChange("jdSummary", event.target.value)} placeholder="Paste a short JD summary for now. AI parsing endpoint comes next." />
      </label>
      <label className="full-span">
        Follow-up email draft
        <textarea rows={4} value={formState.followupEmail} onChange={(event) => handleChange("followupEmail", event.target.value)} placeholder="Optional follow-up draft" />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : selectedApplication ? "Update application" : "Create application"}
      </button>
    </form>
  );
}

export default ApplicationForm;
