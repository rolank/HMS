-- Test Data for HMS Database
-- Tables: Person, Patient, Employee, Doctor, UserAccount

-- ========================================
-- PERSONS (Base table for Patient, Employee, Doctor)
-- ========================================

INSERT INTO `Person` (`id`, `firstName`, `lastName`, `dob`, `gender`, `address`, `phone`) VALUES
-- Patients
('person-001', 'John', 'Smith', '1985-03-15 00:00:00', 'Male', '123 Main St, New York, NY 10001', '+1-555-0101'),
('person-002', 'Sarah', 'Johnson', '1990-07-22 00:00:00', 'Female', '456 Oak Ave, Los Angeles, CA 90001', '+1-555-0102'),
('person-003', 'Michael', 'Brown', '1978-11-08 00:00:00', 'Male', '789 Pine Rd, Chicago, IL 60601', '+1-555-0103'),
('person-004', 'Emily', 'Davis', '1995-02-14 00:00:00', 'Female', '321 Elm St, Houston, TX 77001', '+1-555-0104'),
('person-005', 'David', 'Wilson', '1982-09-30 00:00:00', 'Male', '654 Maple Dr, Phoenix, AZ 85001', '+1-555-0105'),

-- Doctors/Employees
('person-101', 'Dr. Robert', 'Anderson', '1975-05-12 00:00:00', 'Male', '100 Medical Plaza, Boston, MA 02101', '+1-555-0201'),
('person-102', 'Dr. Lisa', 'Martinez', '1980-08-25 00:00:00', 'Female', '200 Health Center, Seattle, WA 98101', '+1-555-0202'),
('person-103', 'Dr. James', 'Taylor', '1972-12-03 00:00:00', 'Male', '300 Care Blvd, Miami, FL 33101', '+1-555-0203'),
('person-104', 'Dr. Maria', 'Garcia', '1983-04-18 00:00:00', 'Female', '400 Hospital Way, Denver, CO 80201', '+1-555-0204'),
('person-105', 'Dr. William', 'Thomas', '1978-10-07 00:00:00', 'Male', '500 Wellness St, Atlanta, GA 30301', '+1-555-0205'),

-- Administrative Staff
('person-201', 'Jennifer', 'White', '1988-06-20 00:00:00', 'Female', '600 Admin Ave, Dallas, TX 75201', '+1-555-0301'),
('person-202', 'Robert', 'Harris', '1985-03-11 00:00:00', 'Male', '700 Office Ln, San Diego, CA 92101', '+1-555-0302'),
('person-203', 'Amanda', 'Clark', '1992-09-15 00:00:00', 'Female', '800 Staff Rd, Portland, OR 97201', '+1-555-0303');

-- ========================================
-- EMERGENCY CONTACTS
-- ========================================

INSERT INTO `EmergencyContact` (`id`, `name`, `relation`, `phone`, `personId`) VALUES
('ec-001', 'Jane Smith', 'Spouse', '+1-555-1101', 'person-001'),
('ec-002', 'Robert Johnson', 'Father', '+1-555-1102', 'person-002'),
('ec-003', 'Patricia Brown', 'Mother', '+1-555-1103', 'person-003'),
('ec-004', 'James Davis', 'Brother', '+1-555-1104', 'person-004'),
('ec-005', 'Linda Wilson', 'Sister', '+1-555-1105', 'person-005');

-- ========================================
-- EMPLOYEES
-- ========================================

INSERT INTO `Employee` (`id`, `employeeId`, `department`, `salary`, `email`, `personId`) VALUES
-- Doctors
('emp-101', 'DOC-001', 'Cardiology', 250000, 'r.anderson@hospital.com', 'person-101'),
('emp-102', 'DOC-002', 'Pediatrics', 230000, 'l.martinez@hospital.com', 'person-102'),
('emp-103', 'DOC-003', 'Orthopedics', 240000, 'j.taylor@hospital.com', 'person-103'),
('emp-104', 'DOC-004', 'Dermatology', 220000, 'm.garcia@hospital.com', 'person-104'),
('emp-105', 'DOC-005', 'Neurology', 260000, 'w.thomas@hospital.com', 'person-105'),

-- Administrative Staff
('emp-201', 'ADM-001', 'Administration', 75000, 'j.white@hospital.com', 'person-201'),
('emp-202', 'ADM-002', 'Reception', 55000, 'r.harris@hospital.com', 'person-202'),
('emp-203', 'ADM-003', 'Nursing', 85000, 'a.clark@hospital.com', 'person-203');

-- ========================================
-- DOCTORS
-- ========================================

INSERT INTO `Doctor` (`id`, `specialty`, `licenseNo`, `qualification`, `employeeId`) VALUES
('doc-001', 'Cardiology', 'LIC-CARD-12345', 'MD, FACC - Harvard Medical School', 'emp-101'),
('doc-002', 'Pediatrics', 'LIC-PEDS-23456', 'MD, FAAP - Johns Hopkins University', 'emp-102'),
('doc-003', 'Orthopedics', 'LIC-ORTH-34567', 'MD, FAAOS - Mayo Clinic', 'emp-103'),
('doc-004', 'Dermatology', 'LIC-DERM-45678', 'MD, FAAD - Stanford University', 'emp-104'),
('doc-005', 'Neurology', 'LIC-NEUR-56789', 'MD, FAAN - Yale School of Medicine', 'emp-105');

-- ========================================
-- PATIENTS
-- ========================================

INSERT INTO `Patient` (`id`, `patientId`, `medicalRecordNumber`, `bloodType`, `insuranceProvider`, `personId`) VALUES
('pat-001', 'P-001', 'MRN-100001', 'A+', 'Blue Cross Blue Shield', 'person-001'),
('pat-002', 'P-002', 'MRN-100002', 'O-', 'Aetna', 'person-002'),
('pat-003', 'P-003', 'MRN-100003', 'B+', 'UnitedHealthcare', 'person-003'),
('pat-004', 'P-004', 'MRN-100004', 'AB+', 'Cigna', 'person-004'),
('pat-005', 'P-005', 'MRN-100005', 'O+', 'Humana', 'person-005');

-- ========================================
-- USER ACCOUNTS
-- ========================================

INSERT INTO `UserAccount` (`id`, `username`, `passwordHash`, `status`, `lastLoginAt`, `ownerId`) VALUES
-- Doctor accounts
('user-101', 'dr.anderson', 'HASHED:password123', 'ACTIVE', '2025-12-03 08:00:00', 'person-101'),
('user-102', 'dr.martinez', 'HASHED:password123', 'ACTIVE', '2025-12-03 08:15:00', 'person-102'),
('user-103', 'dr.taylor', 'HASHED:password123', 'ACTIVE', '2025-12-03 08:30:00', 'person-103'),
('user-104', 'dr.garcia', 'HASHED:password123', 'ACTIVE', '2025-12-03 08:45:00', 'person-104'),
('user-105', 'dr.thomas', 'HASHED:password123', 'ACTIVE', '2025-12-03 09:00:00', 'person-105'),

-- Admin staff accounts
('user-201', 'j.white', 'HASHED:password123', 'ACTIVE', '2025-12-03 07:30:00', 'person-201'),
('user-202', 'r.harris', 'HASHED:password123', 'ACTIVE', '2025-12-03 07:45:00', 'person-202'),
('user-203', 'a.clark', 'HASHED:password123', 'ACTIVE', '2025-12-03 07:50:00', 'person-203'),

-- Patient accounts
('user-001', 'john.smith', 'HASHED:password123', 'ACTIVE', '2025-12-02 18:00:00', 'person-001'),
('user-002', 'sarah.johnson', 'HASHED:password123', 'ACTIVE', '2025-12-02 19:30:00', 'person-002'),
('user-003', 'michael.brown', 'HASHED:password123', 'ACTIVE', '2025-12-02 20:00:00', 'person-003');

-- ========================================
-- SUMMARY
-- ========================================
-- Persons: 13 (5 patients, 5 doctors, 3 admin staff)
-- Emergency Contacts: 5 (one per patient)
-- Employees: 8 (5 doctors, 3 admin staff)
-- Doctors: 5 (Cardiology, Pediatrics, Orthopedics, Dermatology, Neurology)
-- Patients: 5 (with different blood types and insurance providers)
-- User Accounts: 11 (5 doctors, 3 admin, 3 patients)
