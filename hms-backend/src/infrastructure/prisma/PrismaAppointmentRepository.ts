import { prisma } from "../../config/prisma";
import { IAppointmentRepository } from "../../../application/interfaces/IAppointmentRepository";
import { Appointment } from "../../../domain/entities/Appointment";

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async create(a: Appointment): Promise<void> {
    await prisma.appointment.create({
      data: {
        appointmentDate: a.getAppointmentDate(),
        reason: a.getReason(),
        status: a.getStatus(),
        channel: a.getChannel(),
        createdAt: a.getCreatedAt(),

        doctorId: a.getDoctorId(),
        patientId: a.getPatientId(),

        bookedById: a.getBookedById(),
        bookedByRole: a.getBookedByRole(),

        createdById: a.getCreatedById()
      }
    });
  }

  async findById(id: string): Promise<Appointment | null> {
    return prisma.appointment.findUnique({ where: { id } }) as any;
  }

  async findAll(): Promise<Appointment[]> {
    return prisma.appointment.findMany() as any;
  }

  async updateStatus(id: string, status: any): Promise<void> {
    await prisma.appointment.update({
      where: { id },
      data: { status }
    });
  }
}
