import { FormEvent, useEffect, useState } from "react";
import { ApplicationStatus, JobApplication, JobApplicationPayload, ParsedJobDescription } from "../types";

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
  onParseJobDescription: (rawText: string) => Promise<ParsedJobDescription>;
};

function ApplicationForm({ selectedApplication, onSubmit, onCancelEdit, onParseJobDescription }: ApplicationFormProps) {
  const [formState, setFormState] = useState<JobApplicationPayload>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rawJobDescription, setRawJobDescription] = useState("");
  const [parsedResult, setParsedResult] = useState<ParsedJobDescription | null>(null);
  const [parseError, setParseError] = useState("");
  const [isParsing, setIsParsing] = useState(false);

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
    setRawJobDescription("");
    setParsedResult(null);
    setParseError("");
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
        setRawJobDescription("");
        setParsedResult(null);
        setParseError("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleParse = async () => {
    if (!rawJobDescription.trim()) {
      setParseError("Paste a job description before parsing.");
      return;
    }

    setIsParsing(true);
    setParseError("");

    try {
      const parsed = await onParseJobDescription(rawJobDescription);
      setParsedResult(parsed);
      setFormState((current) => ({
        ...current,
        companyName: parsed.companyName || current.companyName,
        jobTitle: parsed.jobTitle || current.jobTitle,
        location: parsed.location || current.location,
        salaryRange: parsed.salaryRange || current.salaryRange,
        jdSummary: parsed.summary || current.jdSummary
      }));
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "Unable to parse job description");
    } finally {
      setIsParsing(false);
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
        <textarea
          rows={6}
          value={rawJobDescription}
          onChange={(event) => setRawJobDescription(event.target.value)}
          placeholder="Paste the full job description here, then click Parse JD."
        />
      </label>
      <div className="full-span parse-actions">
        <button type="button" onClick={handleParse} disabled={isParsing}>
          {isParsing ? "Parsing..." : "Parse JD"}
        </button>
        {parseError && <p className="error-text">{parseError}</p>}
      </div>
      {parsedResult && (
        <section className="full-span parsed-result">
          <h3>Parsed JD summary</h3>
          <p>{parsedResult.summary}</p>
          <h4>Key requirements</h4>
          <ul className="requirements-list">
            {parsedResult.keyRequirements.map((requirement, index) => (
              <li key={`${requirement}-${index}`}>{requirement}</li>
            ))}
          </ul>
        </section>
      )}
      <label className="full-span">
        JD summary
        <textarea
          rows={4}
          value={formState.jdSummary}
          onChange={(event) => handleChange("jdSummary", event.target.value)}
          placeholder="Parsed summary appears here and can still be edited."
        />
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
