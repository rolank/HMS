import { Appointment } from "../../domain/entities/Appointment";
import { AppointmentStatus, CheckInChannel } from "../../domain/common/enums";

export interface IAppointmentRepository {
  create(a: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  updateStatus(id: string, status: AppointmentStatus): Promise<void>;
  checkIn(
    id: string,
    checkedInByUserAccountId: string,
    channel: CheckInChannel,
    notes: string
  ): Promise<void>;
}
