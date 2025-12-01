import { Appointment } from "../../domain/entities/Appointment";

export interface IAppointmentRepository {
  create(a: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  save(a: Appointment): Promise<void>;
}
