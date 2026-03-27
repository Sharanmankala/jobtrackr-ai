import { AuthResponse, DashboardSummary, JobApplication, JobApplicationPayload, ApplicationStatus } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  register: (payload: { name: string; email: string; password: string }) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  login: (payload: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  getDashboard: (token: string) => request<DashboardSummary>("/dashboard", {}, token),

  getApplications: (token: string, status?: ApplicationStatus | "ALL") =>
    request<JobApplication[]>(
      status && status !== "ALL" ? `/applications?status=${status}` : "/applications",
      {},
      token
    ),

  createApplication: (token: string, payload: JobApplicationPayload) =>
    request<JobApplication>("/applications", {
      method: "POST",
      body: JSON.stringify(payload)
    }, token),

  updateApplication: (token: string, id: string, payload: JobApplicationPayload) =>
    request<JobApplication>(`/applications/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }, token),

  deleteApplication: (token: string, id: string) =>
    request<void>(`/applications/${id}`, {
      method: "DELETE"
    }, token)
};
