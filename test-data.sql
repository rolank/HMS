// Test Data for HMS Database
// Tables: Person, Patient, Employee, Doctor, UserAccount

// ========================================
// PERSONS (Base table for Patient, Employee, Doctor)
// ========================================

const persons = [
  // Patients
  { id: "person-001", firstName: "John", lastName: "Smith", dob: "1985-03-15", gender: "Male", address: "123 Main St, New York, NY 10001", phone: "+1-555-0101" },
  { id: "person-002", firstName: "Sarah", lastName: "Johnson", dob: "1990-07-22", gender: "Female", address: "456 Oak Ave, Los Angeles, CA 90001", phone: "+1-555-0102" },
  { id: "person-003", firstName: "Michael", lastName: "Brown", dob: "1978-11-08", gender: "Male", address: "789 Pine Rd, Chicago, IL 60601", phone: "+1-555-0103" },
  { id: "person-004", firstName: "Emily", lastName: "Davis", dob: "1995-02-14", gender: "Female", address: "321 Elm St, Houston, TX 77001", phone: "+1-555-0104" },
  { id: "person-005", firstName: "David", lastName: "Wilson", dob: "1982-09-30", gender: "Male", address: "654 Maple Dr, Phoenix, AZ 85001", phone: "+1-555-0105" },

  // Doctors/Employees
  { id: "person-101", firstName: "Robert", lastName: "Anderson", dob: "1975-05-12", gender: "Male", address: "100 Medical Plaza, Boston, MA 02101", phone: "+1-555-0201" },
  { id: "person-102", firstName: "Lisa", lastName: "Martinez", dob: "1980-08-25", gender: "Female", address: "200 Health Center, Seattle, WA 98101", phone: "+1-555-0202" },
  { id: "person-103", firstName: "James", lastName: "Taylor", dob: "1972-12-03", gender: "Male", address: "300 Care Blvd, Miami, FL 33101", phone: "+1-555-0203" },
  { id: "person-104", firstName: "Maria", lastName: "Garcia", dob: "1983-04-18", gender: "Female", address: "400 Hospital Way, Denver, CO 80201", phone: "+1-555-0204" },
  { id: "person-105", firstName: "William", lastName: "Thomas", dob: "1978-10-07", gender: "Male", address: "500 Wellness St, Atlanta, GA 30301", phone: "+1-555-0205" },

  // Administrative Staff
  { id: "person-201", firstName: "Jennifer", lastName: "White", dob: "1988-06-20", gender: "Female", address: "600 Admin Ave, Dallas, TX 75201", phone: "+1-555-0301" },
  { id: "person-202", firstName: "Robert", lastName: "Harris", dob: "1985-03-11", gender: "Male", address: "700 Office Ln, San Diego, CA 92101", phone: "+1-555-0302" },
  { id: "person-203", firstName: "Amanda", lastName: "Clark", dob: "1992-09-15", gender: "Female", address: "800 Staff Rd, Portland, OR 97201", phone: "+1-555-0303" }
];

// ========================================
// EMERGENCY CONTACTS
// ========================================

const emergencyContacts = [
  { id: "ec-001", name: "Jane Smith", relation: "Spouse", phone: "+1-555-1101", personId: "person-001" },
  { id: "ec-002", name: "Robert Johnson", relation: "Father", phone: "+1-555-1102", personId: "person-002" },
  { id: "ec-003", name: "Patricia Brown", relation: "Mother", phone: "+1-555-1103", personId: "person-003" },
  { id: "ec-004", name: "James Davis", relation: "Brother", phone: "+1-555-1104", personId: "person-004" },
  { id: "ec-005", name: "Linda Wilson", relation: "Sister", phone: "+1-555-1105", personId: "person-005" }
];

// ========================================
// EMPLOYEES
// ========================================

const employees = [
  // Doctors
  { id: "emp-101", employeeId: "DOC-001", department: "Cardiology", salary: 250000, email: "r.anderson@hospital.com", personId: "person-101" },
  { id: "emp-102", employeeId: "DOC-002", department: "Pediatrics", salary: 230000, email: "l.martinez@hospital.com", personId: "person-102" },
  { id: "emp-103", employeeId: "DOC-003", department: "Orthopedics", salary: 240000, email: "j.taylor@hospital.com", personId: "person-103" },
  { id: "emp-104", employeeId: "DOC-004", department: "Dermatology", salary: 220000, email: "m.garcia@hospital.com", personId: "person-104" },
  { id: "emp-105", employeeId: "DOC-005", department: "Neurology", salary: 260000, email: "w.thomas@hospital.com", personId: "person-105" },

  // Administrative Staff
  { id: "emp-201", employeeId: "ADM-001", department: "Administration", salary: 75000, email: "j.white@hospital.com", personId: "person-201" },
  { id: "emp-202", employeeId: "ADM-002", department: "Reception", salary: 55000, email: "r.harris@hospital.com", personId: "person-202" },
  { id: "emp-203", employeeId: "ADM-003", department: "Nursing", salary: 85000, email: "a.clark@hospital.com", personId: "person-203" }
];

// ========================================
// DOCTORS
// ========================================

const doctors = [
  { id: "doc-001", specialty: "Cardiology", licenseNo: "LIC-CARD-12345", qualification: "MD, FACC - Harvard Medical School", employeeId: "emp-101" },
  { id: "doc-002", specialty: "Pediatrics", licenseNo: "LIC-PEDS-23456", qualification: "MD, FAAP - Johns Hopkins University", employeeId: "emp-102" },
  { id: "doc-003", specialty: "Orthopedics", licenseNo: "LIC-ORTH-34567", qualification: "MD, FAAOS - Mayo Clinic", employeeId: "emp-103" },
  { id: "doc-004", specialty: "Dermatology", licenseNo: "LIC-DERM-45678", qualification: "MD, FAAD - Stanford University", employeeId: "emp-104" },
  { id: "doc-005", specialty: "Neurology", licenseNo: "LIC-NEUR-56789", qualification: "MD, FAAN - Yale School of Medicine", employeeId: "emp-105" }
];

// ========================================
// PATIENTS
// ========================================

const patients = [
  { id: "pat-001", patientId: "P-001", medicalRecordNumber: "MRN-100001", bloodType: "A+", insuranceProvider: "Blue Cross Blue Shield", personId: "person-001" },
  { id: "pat-002", patientId: "P-002", medicalRecordNumber: "MRN-100002", bloodType: "O-", insuranceProvider: "Aetna", personId: "person-002" },
  { id: "pat-003", patientId: "P-003", medicalRecordNumber: "MRN-100003", bloodType: "B+", insuranceProvider: "UnitedHealthcare", personId: "person-003" },
  { id: "pat-004", patientId: "P-004", medicalRecordNumber: "MRN-100004", bloodType: "AB+", insuranceProvider: "Cigna", personId: "person-004" },
  { id: "pat-005", patientId: "P-005", medicalRecordNumber: "MRN-100005", bloodType: "O+", insuranceProvider: "Humana", personId: "person-005" }
];

// ========================================
// USER ACCOUNTS
// ========================================

const userAccounts = [
  // Doctor accounts
  { id: "user-101", username: "dr.anderson", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 08:00:00", ownerId: "person-101" },
  { id: "user-102", username: "dr.martinez", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 08:15:00", ownerId: "person-102" },
  { id: "user-103", username: "dr.taylor", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 08:30:00", ownerId: "person-103" },
  { id: "user-104", username: "dr.garcia", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 08:45:00", ownerId: "person-104" },
  { id: "user-105", username: "dr.thomas", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 09:00:00", ownerId: "person-105" },

  // Admin staff accounts
  { id: "user-201", username: "j.white", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 07:30:00", ownerId: "person-201" },
  { id: "user-202", username: "r.harris", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 07:45:00", ownerId: "person-202" },
  { id: "user-203", username: "a.clark", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-03 07:50:00", ownerId: "person-203" },

  // Patient accounts
  { id: "user-001", username: "john.smith", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-02 18:00:00", ownerId: "person-001" },
  { id: "user-002", username: "sarah.johnson", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-02 19:30:00", ownerId: "person-002" },
  { id: "user-003", username: "michael.brown", passwordHash: "HASHED:password123", status: "ACTIVE", lastLoginAt: "2025-12-02 20:00:00", ownerId: "person-003" }
];

// ========================================
// SUMMARY
// ========================================
// Persons: 13 (5 patients, 5 doctors, 3 admin staff)
// Emergency Contacts: 5 (one per patient)
// Employees: 8 (5 doctors, 3 admin staff)
// Doctors: 5 (Cardiology, Pediatrics, Orthopedics, Dermatology, Neurology)
// Patients: 5 (with different blood types and insurance providers)
// User Accounts: 11 (5 doctors, 3 admin, 3 patients)
