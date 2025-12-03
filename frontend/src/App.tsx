import React, { useEffect, useState } from "react";
import {
  createDoctor,
  createEmployee,
  createPatient,
  fetchDoctors,
  fetchEmployees,
  fetchPatients,
  fetchAppointments,
  createAppointment,
  fetchUserAccounts,
  Doctor,
  Employee,
  Patient,
  Appointment,
  UserAccount,
} from "./api";
import UserAccountForm from "./components/UserAccountForm";

// Types imported from api.ts

const initialDoctor = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  employeeId: "",
  department: "",
  salary: 0,
  email: "",
  specialty: "",
  licenseNo: "",
  qualification: "",
};

const initialEmployee = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  employeeId: "",
  department: "",
  salary: 0,
  email: "",
};

const initialPatient = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  patientId: "",
  medicalRecordNumber: "",
  bloodType: "",
  insuranceProvider: "",
};

const initialAppointment = {
  appointmentDate: "",
  reason: "",
  doctorId: "",
  patientId: "",
  bookedById: "",
  bookedByRole: "PATIENT",
  channel: "PATIENT_PORTAL",
  createdByUserAccountId: "",
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [doctorForm, setDoctorForm] = useState(initialDoctor);
  const [employeeForm, setEmployeeForm] = useState(initialEmployee);
  const [patientForm, setPatientForm] = useState(initialPatient);
  const [appointmentForm, setAppointmentForm] = useState(initialAppointment);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);

  const loadData = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const [dsRes, esRes, psRes, asRes, usRes] = await Promise.all([
        fetchDoctors(),
        fetchEmployees(),
        fetchPatients(),
        fetchAppointments(),
        fetchUserAccounts(),
      ]);
      setDoctors(dsRes.doctors || []);
      setEmployees(esRes.employees || []);
      setPatients(psRes.patients || []);
      setAppointments(asRes.appointments || []);
      setUserAccounts(usRes.users || []);
    } catch (err: any) {
      setMessage(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createDoctor(doctorForm);
      setDoctorForm(initialDoctor);
      setMessage("Doctor created");
      await loadData();
    } catch (err: any) {
      setMessage(err.message || "Failed to create doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createEmployee(employeeForm);
      setEmployeeForm(initialEmployee);
      setMessage("Employee created");
      await loadData();
    } catch (err: any) {
      setMessage(err.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createPatient(patientForm);
      setPatientForm(initialPatient);
      setMessage("Patient created");
      await loadData();
    } catch (err: any) {
      setMessage(err.message || "Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createAppointment(appointmentForm);
      setAppointmentForm(initialAppointment);
      setMessage("Appointment booked");
      await loadData();
    } catch (err: any) {
      setMessage(err.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  const update =
    (setter: any) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));

  const doctorLabel = (id: string) => {
    const d = doctors.find((doc) => doc.id === id);
    return d
      ? `${d.person.firstName} ${d.person.lastName} (${d.specialty})`
      : id;
  };

  const patientLabel = (id: string) => {
    const p = patients.find((pat) => pat.id === id);
    if (!p) return id;
    const name =
      `${p.person?.firstName || "Unknown"} ${p.person?.lastName || ""}`.trim();
    return `${name} [${p.patientId}]`;
  };

  return (
    <div className="page">
      <h1>HMS Frontend</h1>
      <p className="muted">
        API base:{" "}
        {import.meta.env.VITE_API_BASE || "http://localhost:8080/api/v1"}
      </p>
      <UserAccountForm />
      {message && <p>{message}</p>}

      <div className="grid">
        <div className="card">
          <h3>Create Doctor</h3>
          <form onSubmit={handleDoctorSubmit}>
            <input
              name="firstName"
              placeholder="First name"
              value={doctorForm.firstName}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={doctorForm.lastName}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="dob"
              type="date"
              placeholder="DOB"
              value={doctorForm.dob}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="gender"
              placeholder="Gender"
              value={doctorForm.gender}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={doctorForm.address}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={doctorForm.phone}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="employeeId"
              placeholder="Employee ID"
              value={doctorForm.employeeId}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="department"
              placeholder="Department"
              value={doctorForm.department}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="salary"
              type="number"
              placeholder="Salary"
              value={doctorForm.salary}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={doctorForm.email}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="specialty"
              placeholder="Specialty"
              value={doctorForm.specialty}
              onChange={update(setDoctorForm)}
              required
            />
            <input
              name="licenseNo"
              placeholder="License No"
              value={doctorForm.licenseNo}
              onChange={update(setDoctorForm)}
              required
            />
            <textarea
              name="qualification"
              placeholder="Qualification"
              value={doctorForm.qualification}
              onChange={update(setDoctorForm)}
              required
            />
            <button type="submit" disabled={loading}>
              Create Doctor
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Create Employee</h3>
          <form onSubmit={handleEmployeeSubmit}>
            <input
              name="firstName"
              placeholder="First name"
              value={employeeForm.firstName}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={employeeForm.lastName}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="dob"
              type="date"
              placeholder="DOB"
              value={employeeForm.dob}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="gender"
              placeholder="Gender"
              value={employeeForm.gender}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={employeeForm.address}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={employeeForm.phone}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="employeeId"
              placeholder="Employee ID"
              value={employeeForm.employeeId}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="department"
              placeholder="Department"
              value={employeeForm.department}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="salary"
              type="number"
              placeholder="Salary"
              value={employeeForm.salary}
              onChange={update(setEmployeeForm)}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={employeeForm.email}
              onChange={update(setEmployeeForm)}
              required
            />
            <button type="submit" disabled={loading}>
              Create Employee
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Create Patient</h3>
          <form onSubmit={handlePatientSubmit}>
            <input
              name="firstName"
              placeholder="First name"
              value={patientForm.firstName}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={patientForm.lastName}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="dob"
              type="date"
              placeholder="DOB"
              value={patientForm.dob}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="gender"
              placeholder="Gender"
              value={patientForm.gender}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={patientForm.address}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={patientForm.phone}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="patientId"
              placeholder="Patient ID"
              value={patientForm.patientId}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="medicalRecordNumber"
              placeholder="Medical Record Number"
              value={patientForm.medicalRecordNumber}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="bloodType"
              placeholder="Blood Type"
              value={patientForm.bloodType}
              onChange={update(setPatientForm)}
              required
            />
            <input
              name="insuranceProvider"
              placeholder="Insurance Provider"
              value={patientForm.insuranceProvider}
              onChange={update(setPatientForm)}
              required
            />
            <button type="submit" disabled={loading}>
              Create Patient
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Book Appointment</h3>
          <form onSubmit={handleAppointmentSubmit}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 8,
              }}
            >
              <li>
                <input
                  name="appointmentDate"
                  type="datetime-local"
                  value={appointmentForm.appointmentDate}
                  onChange={update(setAppointmentForm)}
                  required
                />
              </li>
              <li>
                <input
                  name="reason"
                  placeholder="Reason"
                  value={appointmentForm.reason}
                  onChange={update(setAppointmentForm)}
                  required
                />
              </li>
              <li>
                {doctors.length ? (
                  <select
                    name="doctorId"
                    value={appointmentForm.doctorId}
                    onChange={update(setAppointmentForm)}
                    required
                  >
                    <option value="">Select doctor</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.person.firstName} {d.person.lastName} — {d.specialty}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="doctorId"
                    placeholder="Doctor ID"
                    value={appointmentForm.doctorId}
                    onChange={update(setAppointmentForm)}
                    required
                  />
                )}
              </li>
              <li>
                {patients.length ? (
                  <select
                    name="patientId"
                    value={appointmentForm.patientId}
                    onChange={update(setAppointmentForm)}
                    required
                  >
                    <option value="">Select patient</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.person?.firstName || "Unknown"}{" "}
                        {p.person?.lastName || ""} — Code: {p.patientId}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="patientId"
                    placeholder="Patient ID (UUID)"
                    value={appointmentForm.patientId}
                    onChange={update(setAppointmentForm)}
                    required
                  />
                )}
              </li>
              <li>
                {patients.length ? (
                  <select
                    name="bookedById"
                    value={appointmentForm.bookedById}
                    onChange={update(setAppointmentForm)}
                    required
                  >
                    <option value="">Booked by (patient)</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.person?.id || p.id}>
                        {p.person?.firstName || "Unknown"}{" "}
                        {p.person?.lastName || ""} — Code: {p.patientId}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="bookedById"
                    placeholder="BookedBy (person id)"
                    value={appointmentForm.bookedById}
                    onChange={update(setAppointmentForm)}
                    required
                  />
                )}
              </li>
              <li>
                <select
                  name="bookedByRole"
                  value={appointmentForm.bookedByRole}
                  onChange={update(setAppointmentForm)}
                >
                  <option value="PATIENT">PATIENT</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
              </li>
              <li>
                <select
                  name="channel"
                  value={appointmentForm.channel}
                  onChange={update(setAppointmentForm)}
                >
                  <option value="PATIENT_PORTAL">PATIENT_PORTAL</option>
                  <option value="PHONE">PHONE</option>
                  <option value="FRONT_DESK">FRONT_DESK</option>
                  <option value="REFERRAL_API">REFERRAL_API</option>
                </select>
              </li>
              <li>
                {userAccounts.length ? (
                  <select
                    name="createdByUserAccountId"
                    value={appointmentForm.createdByUserAccountId}
                    onChange={update(setAppointmentForm)}
                    required
                  >
                    <option value="">Created by</option>
                    {userAccounts.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.username} — {u.owner.firstName} {u.owner.lastName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="createdByUserAccountId"
                    placeholder="CreatedBy UserAccount ID"
                    value={appointmentForm.createdByUserAccountId}
                    onChange={update(setAppointmentForm)}
                    required
                  />
                )}
              </li>
              <li>
                <button type="submit" disabled={loading}>
                  Book Appointment
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Doctors</h3>
          <div className="list">
            {doctors.map((d) => (
              <div key={d.id} className="row">
                <strong>
                  {d.person.firstName} {d.person.lastName}
                </strong>{" "}
                — {d.specialty}
                <br />
                <span className="muted">
                  Dept: {d.department} • Email: {d.email}
                </span>
              </div>
            ))}
            {!doctors.length && <p className="muted">No doctors yet.</p>}
          </div>
        </div>

        <div className="card">
          <h3>Employees</h3>
          <div className="list">
            {employees.map((e) => (
              <div key={e.employeeId} className="row">
                <strong>
                  {e.person.firstName} {e.person.lastName}
                </strong>{" "}
                — {e.department}
                <br />
                <span className="muted">Employee ID: {e.employeeId}</span>
              </div>
            ))}
            {!employees.length && <p className="muted">No employees yet.</p>}
          </div>
        </div>

        <div className="card">
          <h3>Appointments</h3>
          <div className="list">
            {appointments.map((a) => (
              <div key={a.id} className="row">
                <strong>{new Date(a.appointmentDate).toLocaleString()}</strong>
                <br />
                <span className="muted">{a.reason}</span>
                <br />
                <span className="muted">Doctor: {doctorLabel(a.doctorId)}</span>
                <br />
                <span className="muted">
                  Patient: {patientLabel(a.patientId)}
                </span>
                <br />
                <span className="muted">Status: {a.status}</span>
              </div>
            ))}
            {!appointments.length && (
              <p className="muted">No appointments yet.</p>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Patients</h3>
          <div className="list">
            {patients.map((p) => (
              <div key={p.id} className="row">
                <strong>
                  {p.person?.firstName || "Unknown"} {p.person?.lastName || ""}
                </strong>{" "}
                — {p.patientId}
                <br />
                <span className="muted">
                  MRN: {p.medicalRecordNumber} • Blood: {p.bloodType}
                </span>
              </div>
            ))}
            {!patients.length && <p className="muted">No patients yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export {};
