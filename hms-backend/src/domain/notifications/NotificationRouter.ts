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
