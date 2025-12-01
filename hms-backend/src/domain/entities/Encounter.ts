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
