import { UUID } from "../common/types";
import {
  AppointmentStatus,
  BookingChannel,
  BookedByRole,
  CheckInChannel
} from "../common/enums";

export class Appointment {
  constructor(
    private id: UUID | undefined,
    private appointmentDate: Date,
    private reason: string,
    private channel: BookingChannel,
    private createdByUserAccountId: string,
    private bookedById: string,
    private bookedByRole: BookedByRole,
    private doctorId: string,
    private patientId: string,
    private status: AppointmentStatus = AppointmentStatus.SCHEDULED,
    private createdAt: Date = new Date(),
    private checkedInByUserAccountId: string | null = null,
    private checkInChannel: CheckInChannel | null = null,
    private checkInNotes: string | null = null
  ) {}

  getId() { return this.id; }
  getAppointmentDate() { return this.appointmentDate; }
  getReason() { return this.reason; }
  getStatus() { return this.status; }
  getChannel() { return this.channel; }
  getCreatedAt() { return this.createdAt; }

  getDoctorId() { return this.doctorId; }
  getPatientId() { return this.patientId; }

  getBookedById() { return this.bookedById; }
  getBookedByRole() { return this.bookedByRole; }

  getCreatedById() { return this.createdByUserAccountId; }

  toPrisma() {
    return {
      appointmentDate: this.appointmentDate,
      reason: this.reason,
      status: this.status,
      channel: this.channel,
      createdAt: this.createdAt,
      doctorId: this.doctorId,
      patientId: this.patientId,
      bookedById: this.bookedById,
      bookedByRole: this.bookedByRole,
      createdById: this.createdByUserAccountId,
      checkedInById: this.checkedInByUserAccountId,
      checkInChannel: this.checkInChannel,
      checkInNotes: this.checkInNotes
    };
  }
}

