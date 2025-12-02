import { IAppointmentRepository } from "../../interfaces/IAppointmentRepository";
import { AppointmentStatus, CheckInChannel } from "../../../domain/common/enums";

export class CheckInAppointmentUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(
    appointmentId: string,
    userAccountId: string,
    channel: CheckInChannel,
    notes: string
  ) {
    const appointment = await this.repo.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // No call to appointment.checkIn() because your entity does not define it anymore

    // Write check-in directly into DB
    await this.repo.checkIn(appointmentId, userAccountId, channel, notes);

    // Update status
    await this.repo.updateStatus(appointmentId, AppointmentStatus.COMPLETED);

    return { message: "Checked in" };
  }
}

