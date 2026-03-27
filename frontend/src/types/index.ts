export type AuthResponse = {
  token: string;
  userId: string;
  email: string;
  name: string;
};

export type ApplicationStatus = "SAVED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export type JobApplication = {
  id: string;
  companyName: string;
  jobTitle: string;
  jobUrl: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string | null;
  location?: string | null;
  salaryRange?: string | null;
  jdSummary?: string | null;
  followupEmail?: string | null;
  healthScore: number;
  createdAt: string;
  updatedAt: string;
};

export type DashboardSummary = {
  countsByStatus: Record<ApplicationStatus, number>;
  totalApplications: number;
};

export type JobApplicationPayload = {
  companyName: string;
  jobTitle: string;
  jobUrl: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
  location?: string;
  salaryRange?: string;
  jdSummary?: string;
  followupEmail?: string;
};
