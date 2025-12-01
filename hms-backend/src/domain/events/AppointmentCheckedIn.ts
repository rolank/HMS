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
