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

   member?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface CreateVisitorPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  departmentId: string;
  purpose: string;
}

export interface Receptionist {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface DepartmentMember {
  id: string;
  name: string;
  email: string | null;
  role: string;
  departmentId: string;
}
