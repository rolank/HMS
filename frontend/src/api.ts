const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api/v1";

type HttpMethod = "GET" | "POST";

async function request<T>(path: string, method: HttpMethod = "GET", body?: any): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (data && data.error) || res.statusText;
    throw new Error(message);
  }
  return data as T;
}

export interface Doctor {
  id: string;
  employeeId: string;
  specialty: string;
  licenseNo: string;
  qualification: string;
  department: string;
  salary: number;
  email: string;
  person: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Employee {
  employeeId: string;
  department: string;
  salary: number;
  email: string;
  person: {
    id: string;
    firstName: string;
    lastName: string;
  };
  doctor?: {
    specialty: string;
    licenseNo: string;
    qualification: string;
  } | null;
}

export interface Appointment {
  id: string;
  appointmentDate: string;
  reason: string;
  doctorId: string;
  patientId: string;
  status: string;
}

export interface UserAccount {
  id: string;
  username: string;
  status: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Patient {
  id: string;
  patientId: string;
  medicalRecordNumber: string;
  bloodType: string;
  insuranceProvider: string;
  person?: {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
  };
}

export function fetchDoctors() {
  return request<{ success: boolean; doctors: Doctor[] }>("/doctors");
}

export function createDoctor(payload: any) {
  return request<{ success: boolean; doctor: Doctor }>("/doctors", "POST", payload);
}

export function fetchEmployees() {
  return request<{ success: boolean; employees: Employee[] }>("/employees");
}

export function createEmployee(payload: any) {
  return request<{ success: boolean; employee: any }>("/employees", "POST", payload);
}

export function fetchPatients() {
  return request<{ success: boolean; patients: Patient[] }>("/patients");
}

export function createPatient(payload: any) {
  return request<{ success: boolean; patient: any }>("/patients", "POST", payload);
}

export function fetchUserAccounts() {
  return request<{ success: boolean; users: UserAccount[] }>("/useraccount");
}

export function fetchAppointments() {
  return request<{ success: boolean; appointments: Appointment[] }>("/appointments");
}

export function createAppointment(payload: any) {
  return request<{ message: string }>("/appointments", "POST", payload);
}
