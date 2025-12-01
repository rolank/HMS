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
