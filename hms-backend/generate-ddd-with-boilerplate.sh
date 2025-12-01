#!/bin/bash
echo "🚀 Generating FULL DDD Backend (folders + boilerplate)..."

# ============================================
#  CREATE DIRECTORIES
# ============================================
mkdir -p src/domain/common
mkdir -p src/domain/value-objects
mkdir -p src/domain/entities
mkdir -p src/domain/events
mkdir -p src/domain/notifications

mkdir -p src/application/interfaces
mkdir -p src/application/usecases/patients
mkdir -p src/application/usecases/appointments

mkdir -p src/infrastructure/prisma
mkdir -p src/infrastructure/mappers

mkdir -p src/interfaces/http/controllers
mkdir -p src/interfaces/http/routes
mkdir -p src/interfaces/dtos
mkdir -p src/interfaces/middleware

mkdir -p src/config

touch src/app.ts
touch src/server.ts

# ============================================
#  DOMAIN: COMMON
# ============================================
cat <<'EOF' > src/domain/common/types.ts
export type UUID = string;
EOF

cat <<'EOF' > src/domain/common/enums.ts
export enum AccountStatus {
  ACTIVE="ACTIVE",
  LOCKED="LOCKED",
  DISABLED="DISABLED"
}

export enum AppointmentStatus {
  SCHEDULED="SCHEDULED",
  COMPLETED="COMPLETED",
  CANCELLED="CANCELLED",
  NO_SHOW="NO_SHOW"
}

export enum BookingChannel {
  PHONE="PHONE",
  FRONT_DESK="FRONT_DESK",
  PATIENT_PORTAL="PATIENT_PORTAL",
  REFERRAL_API="REFERRAL_API"
}

export enum BookedByRole {
  PATIENT="PATIENT",
  EMPLOYEE="EMPLOYEE"
}

export enum CheckInChannel {
  KIOSK="KIOSK",
  FRONT_DESK="FRONT_DESK",
  MOBILE_APP="MOBILE_APP"
}

export enum EncounterStatus {
  PLANNED="PLANNED",
  ACTIVE="ACTIVE",
  COMPLETED="COMPLETED",
  CANCELLED="CANCELLED"
}

export enum RecordStatus {
  DRAFT="DRAFT",
  SIGNED="SIGNED",
  AMENDED="AMENDED"
}

export enum VitalType {
  HEART_RATE="HEART_RATE",
  BLOOD_PRESSURE="BLOOD_PRESSURE",
  TEMPERATURE="TEMPERATURE",
  RESPIRATORY_RATE="RESPIRATORY_RATE",
  SPO2="SPO2"
}

export enum DiagnosisType {
  PRIMARY="PRIMARY",
  SECONDARY="SECONDARY",
  RULE_OUT="RULE_OUT"
}

export enum OrderType {
  LAB="LAB",
  IMAGING="IMAGING",
  PROCEDURE="PROCEDURE",
  REFERRAL="REFERRAL"
}

export enum OrderStatus {
  ORDERED="ORDERED",
  IN_PROGRESS="IN_PROGRESS",
  COMPLETED="COMPLETED",
  CANCELLED="CANCELLED"
}

export enum NotificationTopic {
  APPOINTMENT_CHECKED_IN="APPOINTMENT_CHECKED_IN",
  APPOINTMENT_REMINDER="APPOINTMENT_REMINDER",
  LAB_RESULT_READY="LAB_RESULT_READY"
}

export enum NotificationChannel {
  EMAIL="EMAIL",
  SMS="SMS",
  PUSH="PUSH"
}
EOF

# ============================================
#  DOMAIN: VALUE OBJECTS
# ============================================
cat <<'EOF' > src/domain/value-objects/EmergencyContact.ts
export class EmergencyContact {
  private name: string;
  private relation: string;
  private phone: string;

  constructor(name: string, relation: string, phone: string) {
    this.name = name;
    this.relation = relation;
    this.phone = phone;
  }

  getName(): string { return this.name; }
  setName(v: string): void { this.name = v; }

  getRelation(): string { return this.relation; }
  setRelation(v: string): void { this.relation = v; }

  getPhone(): string { return this.phone; }
  setPhone(v: string): void { this.phone = v; }
}
EOF

# ============================================
#  DOMAIN: ENTITIES
# ============================================
cat <<'EOF' > src/domain/entities/Person.ts
import { UUID } from "../common/types";
import { EmergencyContact } from "../value-objects/EmergencyContact";

export class Person {
  private id: UUID;
  private firstName: string;
  private lastName: string;
  private dob: Date;
  private gender: string;
  private address: string;
  private phone: string;
  private emergencyContacts: EmergencyContact[];

  constructor(
    id: UUID,
    firstName: string,
    lastName: string,
    dob: Date,
    gender: string,
    address: string,
    phone: string,
    contacts: EmergencyContact[] = []
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
    this.emergencyContacts = contacts;
  }

  getId(): UUID { return this.id; }

  getFirstName(): string { return this.firstName; }
  setFirstName(v: string): void { this.firstName = v; }

  getLastName(): string { return this.lastName; }
  setLastName(v: string): void { this.lastName = v; }

  getDob(): Date { return this.dob; }
  setDob(v: Date): void { this.dob = v; }

  getGender(): string { return this.gender; }
  setGender(v: string): void { this.gender = v; }

  getAddress(): string { return this.address; }
  setAddress(v: string): void { this.address = v; }

  getPhone(): string { return this.phone; }
  setPhone(v: string): void { this.phone = v; }

  addEmergencyContact(c: EmergencyContact): void { this.emergencyContacts.push(c); }
  removeEmergencyContact(c: EmergencyContact): void {
    this.emergencyContacts = this.emergencyContacts.filter(x => x !== c);
  }
  getEmergencyContacts(): EmergencyContact[] {
    return [...this.emergencyContacts];
  }
}
EOF

# EMPLOYEE
cat <<'EOF' > src/domain/entities/Employee.ts
import { Person } from "./Person";

export class Employee extends Person {
  private employeeId: string;
  private department: string;
  private salary: number;
  private email: string;

  constructor(base: Person, employeeId: string, department: string, salary: number, email: string) {
    super(
      base.getId(),
      base.getFirstName(),
      base.getLastName(),
      base.getDob(),
      base.getGender(),
      base.getAddress(),
      base.getPhone(),
      base.getEmergencyContacts()
    );
    this.employeeId = employeeId;
    this.department = department;
    this.salary = salary;
    this.email = email;
  }

  getEmployeeId(): string { return this.employeeId; }
  setEmployeeId(v: string): void { this.employeeId = v; }

  getDepartment(): string { return this.department; }
  setDepartment(v: string): void { this.department = v; }

  getSalary(): number { return this.salary; }
  setSalary(v: number): void { this.salary = v; }

  getEmail(): string { return this.email; }
  setEmail(v: string): void { this.email = v; }
}
EOF

# DOCTOR
cat <<'EOF' > src/domain/entities/Doctor.ts
import { Employee } from "./Employee";
import { Person } from "./Person";

export class Doctor extends Employee {
  private specialty: string;
  private licenseNo: string;
  private qualification: string;

  constructor(
    base: Person,
    employeeId: string,
    department: string,
    salary: number,
    email: string,
    specialty: string,
    licenseNo: string,
    qualification: string
  ) {
    super(base, employeeId, department, salary, email);
    this.specialty = specialty;
    this.licenseNo = licenseNo;
    this.qualification = qualification;
  }

  getSpecialty(): string { return this.specialty; }
  setSpecialty(v: string): void { this.specialty = v; }

  getLicenseNo(): string { return this.licenseNo; }
  setLicenseNo(v: string): void { this.licenseNo = v; }

  getQualification(): string { return this.qualification; }
  setQualification(v: string): void { this.qualification = v; }
}
EOF

# PATIENT
cat <<'EOF' > src/domain/entities/Patient.ts
import { Person } from "./Person";

export class Patient extends Person {
  private patientId: string;
  private medicalRecordNumber: string;
  private bloodType: string;
  private insuranceProvider: string;

  constructor(
    base: Person,
    patientId: string,
    medicalRecordNumber: string,
    bloodType: string,
    insuranceProvider: string
  ) {
    super(
      base.getId(),
      base.getFirstName(),
      base.getLastName(),
      base.getDob(),
      base.getGender(),
      base.getAddress(),
      base.getPhone(),
      base.getEmergencyContacts()
    );
    this.patientId = patientId;
    this.medicalRecordNumber = medicalRecordNumber;
    this.bloodType = bloodType;
    this.insuranceProvider = insuranceProvider;
  }

  getPatientId(): string { return this.patientId; }
  setPatientId(v: string): void { this.patientId = v; }

  getMedicalRecordNumber(): string { return this.medicalRecordNumber; }
  setMedicalRecordNumber(v: string): void { this.medicalRecordNumber = v; }

  getBloodType(): string { return this.bloodType; }
  setBloodType(v: string): void { this.bloodType = v; }

  getInsuranceProvider(): string { return this.insuranceProvider; }
  setInsuranceProvider(v: string): void { this.insuranceProvider = v; }
}
EOF

# USERACCOUNT
cat <<'EOF' > src/domain/entities/UserAccount.ts
import { UUID } from "../common/types";
import { AccountStatus } from "../common/enums";
import { Person } from "./Person";

export class UserAccount {
  private userId: UUID;
  private username: string;
  private passwordHash: string;
  private status: AccountStatus;
  private lastLoginAt: Date | null;
  private owner: Person;

  constructor(
    userId: UUID,
    username: string,
    passwordHash: string,
    status: AccountStatus,
    owner: Person,
    lastLoginAt: Date | null = null
  ) {
    this.userId = userId;
    this.username = username;
    this.passwordHash = passwordHash;
    this.status = status;
    this.owner = owner;
    this.lastLoginAt = lastLoginAt;
  }

  getUserId(): UUID { return this.userId; }
  getUsername(): string { return this.username; }
  setUsername(v: string): void { this.username = v; }

  getPasswordHash(): string { return this.passwordHash; }
  setPasswordHash(v: string): void { this.passwordHash = v; }

  getStatus(): AccountStatus { return this.status; }
  setStatus(v: AccountStatus): void { this.status = v; }

  getLastLoginAt(): Date | null { return this.lastLoginAt; }
  setLastLoginAt(v: Date | null): void { this.lastLoginAt = v; }

  getOwner(): Person { return this.owner; }
  setOwner(v: Person): void { this.owner = v; }
}
EOF

# APPOINTMENT
cat <<'EOF' > src/domain/entities/Appointment.ts
import { UUID } from "../common/types";
import {
  AppointmentStatus,
  BookingChannel,
  BookedByRole,
  CheckInChannel
} from "../common/enums";
import { Person } from "./Person";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { UserAccount } from "./UserAccount";
import { AppointmentCheckedIn } from "../events/AppointmentCheckedIn";

export class Appointment {
  private appointmentId: UUID;
  private appointmentDate: Date;
  private reason: string;
  private status: AppointmentStatus;
  private channel: BookingChannel;
  private bookedBy: Person;
  private bookedByRole: BookedByRole;
  private doctor: Doctor;
  private patient: Patient;
  private createdByUserAccount: UserAccount;
  private createdAt: Date;
  private checkedInByUserAccount: UserAccount | null;
  private checkInChannel: CheckInChannel | null;
  private checkInNotes: string | null;

  constructor(
    appointmentId: UUID,
    appointmentDate: Date,
    reason: string,
    status: AppointmentStatus,
    channel: BookingChannel,
    bookedBy: Person,
    bookedByRole: BookedByRole,
    doctor: Doctor,
    patient: Patient,
    createdByUserAccount: UserAccount,
    createdAt: Date
  ) {
    this.appointmentId = appointmentId;
    this.appointmentDate = appointmentDate;
    this.reason = reason;
    this.status = status;
    this.channel = channel;
    this.bookedBy = bookedBy;
    this.bookedByRole = bookedByRole;
    this.doctor = doctor;
    this.patient = patient;
    this.createdByUserAccount = createdByUserAccount;
    this.createdAt = createdAt;
    this.checkedInByUserAccount = null;
    this.checkInChannel = null;
    this.checkInNotes = null;
  }

  getAppointmentId(): UUID { return this.appointmentId; }

  checkIn(
    checkedInBy: UserAccount,
    channel: CheckInChannel,
    checkedInAt: Date,
    notes: string
  ): AppointmentCheckedIn {
    this.checkedInByUserAccount = checkedInBy;
    this.checkInChannel = channel;
    this.checkInNotes = notes;
    this.status = AppointmentStatus.COMPLETED;

    return new AppointmentCheckedIn(
      this.appointmentId,
      this.doctor.getEmployeeId(),
      this.patient.getPatientId(),
      checkedInBy.getUserId(),
      channel,
      checkedInAt
    );
  }
}
EOF

# ENCOUNTER (simplified placeholder)
cat <<'EOF' > src/domain/entities/Encounter.ts
import { UUID } from "../common/types";
import { Appointment } from "./Appointment";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";
import { UserAccount } from "./UserAccount";
import { EncounterStatus } from "../common/enums";

export class Encounter {
  private encounterId: UUID;
  private appointment: Appointment;
  private patient: Patient;
  private doctor: Doctor;
  private startedBy: UserAccount | null = null;
  private endedBy: UserAccount | null = null;
  private startedAt: Date | null = null;
  private endedAt: Date | null = null;
  private status: EncounterStatus = EncounterStatus.PLANNED;

  constructor(
    encounterId: UUID,
    appointment: Appointment,
    patient: Patient,
    doctor: Doctor
  ) {
    this.encounterId = encounterId;
    this.appointment = appointment;
    this.patient = patient;
    this.doctor = doctor;
  }

  start(user: UserAccount): void {
    this.startedBy = user;
    this.startedAt = new Date();
    this.status = EncounterStatus.ACTIVE;
  }

  end(user: UserAccount): void {
    this.endedBy = user;
    this.endedAt = new Date();
    this.status = EncounterStatus.COMPLETED;
  }

  cancel(user: UserAccount): void {
    this.endedBy = user;
    this.status = EncounterStatus.CANCELLED;
  }
}
EOF

# Other domain entities simplified placeholders
echo "// placeholder" > src/domain/entities/MedicalRecord.ts
echo "// placeholder" > src/domain/entities/VitalSign.ts
echo "// placeholder" > src/domain/entities/Observation.ts
echo "// placeholder" > src/domain/entities/Diagnosis.ts
echo "// placeholder" > src/domain/entities/Order.ts
echo "// placeholder" > src/domain/entities/MedicationOrder.ts

# ============================================
# DOMAIN EVENTS
# ============================================
cat <<'EOF' > src/domain/events/AppointmentCheckedIn.ts
import { UUID } from "../common/types";
import { CheckInChannel } from "../common/enums";

export class AppointmentCheckedIn {
  constructor(
    private appointmentId: UUID,
    private doctorId: string,
    private patientId: string,
    private checkedInByUserAccountId: UUID,
    private channel: CheckInChannel,
    private checkedInAt: Date
  ) {}

  getAppointmentId(): UUID { return this.appointmentId; }
  getDoctorId(): string { return this.doctorId; }
  getPatientId(): string { return this.patientId; }
  getCheckedInByUserAccountId(): UUID { return this.checkedInByUserAccountId; }
  getChannel(): CheckInChannel { return this.channel; }
  getCheckedInAt(): Date { return this.checkedInAt; }
}
EOF

cat <<'EOF' > src/domain/events/EventBus.ts
type EventHandler<T> = (event: T) => void | Promise<void>;

export class EventBus {
  private handlers: Map<string, EventHandler<any>[]> = new Map();

  subscribe<T>(eventClass: new (...args: any[]) => T, handler: EventHandler<T>) {
    const key = eventClass.name;
    if (!this.handlers.has(key)) this.handlers.set(key, []);
    this.handlers.get(key)!.push(handler as EventHandler<any>);
  }

  async publish<T>(event: T): Promise<void> {
    const key = (event as any).constructor.name;
    const handlers = this.handlers.get(key) || [];
    for (const handler of handlers) {
      await handler(event);
    }
  }
}
EOF

# ============================================
# DOMAIN NOTIFICATIONS
# ============================================
cat <<'EOF' > src/domain/notifications/NotificationPreference.ts
import { UUID } from "../common/types";
import { NotificationChannel, NotificationTopic } from "../common/enums";

export class NotificationPreference {
  constructor(
    private userAccountId: UUID,
    private topic: NotificationTopic,
    private channels: Set<NotificationChannel>,
    private enabled: boolean = true,
    private quietStart: string | null = null,
    private quietEnd: string | null = null
  ) {}

  getUserAccountId(): UUID { return this.userAccountId; }
  getTopic(): NotificationTopic { return this.topic; }
  getChannels(): Set<NotificationChannel> { return new Set(this.channels); }
  isEnabled(): boolean { return this.enabled; }
}
EOF

cat <<'EOF' > src/domain/notifications/NotificationRequest.ts
import { UUID } from "../common/types";
import { NotificationChannel, NotificationTopic } from "../common/enums";

export class NotificationRequest {
  constructor(
    private idempotencyKey: string,
    private topic: NotificationTopic,
    private recipientUserAccountId: UUID,
    private channels: Set<NotificationChannel>,
    private data: Map<string, string>
  ) {}

  getIdempotencyKey() { return this.idempotencyKey; }
  getTopic() { return this.topic; }
  getRecipientUserAccountId() { return this.recipientUserAccountId; }
  getChannels() { return new Set(this.channels); }
  getData() { return new Map(this.data); }
}
EOF

cat <<'EOF' > src/domain/notifications/NotificationRouter.ts
import { AppointmentCheckedIn } from "../events/AppointmentCheckedIn";
import { NotificationRequest } from "./NotificationRequest";
import { NotificationChannel, NotificationTopic } from "../common/enums";

export class NotificationRouter {
  route(event: AppointmentCheckedIn): NotificationRequest[] {
    const channels = new Set([NotificationChannel.EMAIL]);

    const data = new Map([
      ["appointmentId", event.getAppointmentId()],
      ["checkedInAt", event.getCheckedInAt().toISOString()],
      ["channel", event.getChannel()]
    ]);

    const request = new NotificationRequest(
      `checkin-${event.getAppointmentId()}`,
      NotificationTopic.APPOINTMENT_CHECKED_IN,
      event.getPatientId(),
      channels,
      data
    );

    return [request];
  }
}
EOF

cat <<'EOF' > src/domain/notifications/NotificationService.ts
import { NotificationRequest } from "./NotificationRequest";

export class NotificationService {
  async send(req: NotificationRequest) {
    console.log("Sending notification:", {
      topic: req.getTopic(),
      to: req.getRecipientUserAccountId(),
      channels: [...req.getChannels()],
      data: [...req.getData().entries()]
    });
  }
}
EOF

# ============================================
# APPLICATION INTERFACES (REPOSITORIES)
# ============================================
cat <<'EOF' > src/application/interfaces/IPatientRepository.ts
import { Patient } from "../../domain/entities/Patient";

export interface IPatientRepository {
  create(patient: Patient): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
}
EOF

cat <<'EOF' > src/application/interfaces/IAppointmentRepository.ts
import { Appointment } from "../../domain/entities/Appointment";

export interface IAppointmentRepository {
  create(a: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  save(a: Appointment): Promise<void>;
}
EOF

# ============================================
# APPLICATION USE CASES
# ============================================
cat <<'EOF' > src/application/usecases/patients/CreatePatientUseCase.ts
import { IPatientRepository } from "../../interfaces/IPatientRepository";
import { Patient } from "../../../domain/entities/Patient";
import { Person } from "../../../domain/entities/Person";
import { EmergencyContact } from "../../../domain/value-objects/EmergencyContact";
import { v4 as uuid } from "uuid";

interface Command {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  emergencyContacts?: {name: string; relation: string; phone: string;}[];
  patientId: string;
  medicalRecordNumber: string;
  bloodType: string;
  insuranceProvider: string;
}

export class CreatePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(cmd: Command) {
    const person = new Person(
      uuid(),
      cmd.firstName,
      cmd.lastName,
      new Date(cmd.dob),
      cmd.gender,
      cmd.address,
      cmd.phone,
      (cmd.emergencyContacts || []).map(
        c => new EmergencyContact(c.name, c.relation, c.phone)
      )
    );

    const patient = new Patient(
      person,
      cmd.patientId,
      cmd.medicalRecordNumber,
      cmd.bloodType,
      cmd.insuranceProvider
    );

    await this.repo.create(patient);
  }
}
EOF

# ============================================
# INFRASTRUCTURE MAPPERS
# ============================================
cat <<'EOF' > src/infrastructure/mappers/PatientMapper.ts
import { Patient } from "../../domain/entities/Patient";
import { EmergencyContact } from "../../domain/value-objects/EmergencyContact";
import { Person } from "../../domain/entities/Person";

export class PatientMapper {
  static toPrisma(p: Patient) {
    return {
      id: p.getId(),
      patientId: p.getPatientId(),
      medicalRecordNumber: p.getMedicalRecordNumber(),
      bloodType: p.getBloodType(),
      insuranceProvider: p.getInsuranceProvider(),
      firstName: p.getFirstName(),
      lastName: p.getLastName(),
      dob: p.getDob(),
      gender: p.getGender(),
      address: p.getAddress(),
      phone: p.getPhone(),
      emergencyContacts: p.getEmergencyContacts().map(c => ({
        name: c.getName(),
        relation: c.getRelation(),
        phone: c.getPhone()
      }))
    };
  }
}
EOF

# ============================================
# INFRASTRUCTURE REPOSITORIES
# ============================================
cat <<'EOF' > src/infrastructure/prisma/PrismaPatientRepository.ts
import { IPatientRepository } from "../../application/interfaces/IPatientRepository";
import prisma from "../../config/prisma";
import { PatientMapper } from "../mappers/PatientMapper";
import { Patient } from "../../domain/entities/Patient";
import { EmergencyContact } from "../../domain/value-objects/EmergencyContact";
import { Person } from "../../domain/entities/Person";

export class PrismaPatientRepository implements IPatientRepository {
  async create(p: Patient): Promise<void> {
    await prisma.patient.create({
      data: PatientMapper.toPrisma(p)
    });
  }

  async findById(id: string): Promise<Patient | null> {
    const data = await prisma.patient.findUnique({ where: { id } });
    return data ? PrismaPatientRepository.toDomain(data) : null;
  }

  async findAll(): Promise<Patient[]> {
    const list = await prisma.patient.findMany();
    return list.map(PrismaPatientRepository.toDomain);
  }

  static toDomain(d: any): Patient {
    const base = new Person(
      d.id,
      d.firstName,
      d.lastName,
      d.dob,
      d.gender,
      d.address,
      d.phone,
      (d.emergencyContacts || []).map(
        (c: any) => new EmergencyContact(c.name, c.relation, c.phone)
      )
    );

    return new Patient(
      base,
      d.patientId,
      d.medicalRecordNumber,
      d.bloodType,
      d.insuranceProvider
    );
  }
}
EOF

# ============================================
# INTERFACES LAYER (HTTP)
# ============================================
cat <<'EOF' > src/interfaces/http/controllers/PatientController.ts
import { Request, Response } from "express";
import { CreatePatientUseCase } from "../../../application/usecases/patients/CreatePatientUseCase";
import { PrismaPatientRepository } from "../../../infrastructure/prisma/PrismaPatientRepository";

export class PatientController {
  static async create(req: Request, res: Response) {
    const repo = new PrismaPatientRepository();
    const usecase = new CreatePatientUseCase(repo);

    await usecase.execute(req.body);

    return res.status(201).json({ message: "Patient created" });
  }

  static async list(req: Request, res: Response) {
    const repo = new PrismaPatientRepository();
    const result = await repo.findAll();
    return res.json(result);
  }
}
EOF

cat <<'EOF' > src/interfaces/http/routes/patient.routes.ts
import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const router = Router();

router.post("/", PatientController.create);
router.get("/", PatientController.list);

export default router;
EOF

cat <<'EOF' > src/interfaces/http/routes/index.ts
import { Router } from "express";
import patientRoutes from "./patient.routes";

const router = Router();
router.use("/patients", patientRoutes);

export default router;
EOF

# ============================================
# MIDDLEWARE
# ============================================
cat <<'EOF' > src/interfaces/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  return res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error"
  });
}
EOF

cat <<'EOF' > src/interfaces/middleware/notFound.ts
import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  return res.status(404).json({ message: \`Route \${req.originalUrl} not found\` });
}
EOF

# ============================================
# CONFIG FILES
# ============================================
cat <<'EOF' > src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "4000"
};
EOF

cat <<'EOF' > src/config/prisma.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
EOF

# ============================================
# EXPRESS APP
# ============================================
cat <<'EOF' > src/app.ts
import express from "express";
import routes from "./interfaces/http/routes";
import { errorHandler } from "./interfaces/middleware/errorHandler";
import { notFound } from "./interfaces/middleware/notFound";

const app = express();
app.use(express.json());

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
EOF

# ============================================
# SERVER
# ============================================
cat <<'EOF' > src/server.ts
import app from "./app";
import { ENV } from "./config/env";

const port = ENV.PORT;

app.listen(port, () => {
  console.log(\`🚀 Server running on http://localhost:\${port}\`);
});
EOF

echo "🎉 Full DDD project + boilerplate generated successfully!"
