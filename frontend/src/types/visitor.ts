// Shared TypeScript types — match the API contract exactly.
// Import from here in all your components. Do NOT redefine these elsewhere.

export type VisitorStatus = "PENDING" | "CHECKED_IN" | "CHECKED_OUT";

export interface Visitor {
  id: string;
  fullName: string;
  email:string;
  phoneNumber:string;
  purpose: string;
  status: VisitorStatus;

  department?: {
    id: string;
    name: string;
  };
}

export interface CreateVisitorPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  departmentId: string;
  purpose: string;
}
