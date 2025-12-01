import { IAppointmentRepository } from "../../interfaces/IAppointmentRepository";
import { AppointmentStatus, CheckInChannel } from "../../../domain/common/enums";
import { AppointmentCheckedIn } from "../../../domain/events/AppointmentCheckedIn";
import { EventBus } from "../../../domain/events/EventBus";

export class CheckInAppointmentUseCase {
  constructor(
    private repo: IAppointmentRepository,
    private eventBus: EventBus
  ) {}

  async execute(
    appointmentId: string,
    userAccountId: string,
    channel: CheckInChannel,
    notes: string
  ) {
    const appointment = await this.repo.findById(appointmentId);

    if (!appointment) 
      throw new Error("Appointment not found");

    appointment.checkIn(userAccountId, channel, notes);

    await this.repo.updateStatus(appointmentId, AppointmentStatus.COMPLETED);

    // Publish event
    const event = new AppointmentCheckedIn(
      appointmentId,
      appointment.getDoctorId(),
      appointment.getPatientId(),
      userAccountId,
      channel
    );

    await this.eventBus.publish(event);
  }
}
