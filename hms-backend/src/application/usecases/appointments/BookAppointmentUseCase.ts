import { IAppointmentRepository } from "../../interfaces/IAppointmentRepository";
import { Appointment } from "../../../domain/entities/Appointment";
import { Person } from "../../../domain/entities/Person";
import { Doctor } from "../../../domain/entities/Doctor";
import { Patient } from "../../../domain/entities/Patient";
import { BookingChannel, BookedByRole } from "../../../domain/common/enums";

interface BookAppointmentRequest {
  appointmentDate: Date;
  reason: string;
  doctorId: string;
  patientId: string;
  bookedById: string;
  bookedByRole: BookedByRole;
  channel: BookingChannel;
  createdByUserAccountId: string;
}

export class BookAppointmentUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(data: BookAppointmentRequest): Promise<Appointment> {
    const appointment = new Appointment(
      undefined, // Prisma will generate id
      data.appointmentDate,
      data.reason,
      data.channel,
      data.createdByUserAccountId,
      data.bookedById,
      data.bookedByRole,
      data.doctorId,
      data.patientId
    );

    await this.repo.create(appointment);

    return appointment;
  }
}
