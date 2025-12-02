import { prisma } from "../../config/prisma";
import { IAppointmentRepository } from "../../application/interfaces/IAppointmentRepository";
import { Appointment } from "../../domain/entities/Appointment";
import {
  AppointmentStatus,
  BookingChannel,
  BookedByRole,
  CheckInChannel
} from "../../domain/common/enums";

export class PrismaAppointmentRepository implements IAppointmentRepository {

  async create(a: Appointment): Promise<void> {
    await prisma.appointment.create({
      data: a.toPrisma(),
    });
  }

  async findAll(): Promise<Appointment[]> {
    const rows = await prisma.appointment.findMany({
      select: {
        id: true,
        appointmentDate: true,
        reason: true,
        channel: true,
        createdById: true,
        bookedById: true,
        bookedByRole: true,
        doctorId: true,
        patientId: true,
        status: true,
        createdAt: true,
        checkedInById: true,
        checkInChannel: true,
        checkInNotes: true,
      },
    });

    return rows.map(
      (r) =>
        new Appointment(
          r.id,
          r.appointmentDate,
          r.reason,
          r.channel as BookingChannel,
          r.createdById,
          r.bookedById,
          r.bookedByRole as BookedByRole,
          r.doctorId,
          r.patientId,
          r.status as AppointmentStatus,
          r.createdAt,
          r.checkedInById,
          r.checkInChannel as CheckInChannel | null,
          r.checkInNotes
        )
    );
  }

  async findById(id: string): Promise<Appointment | null> {
    const r = await prisma.appointment.findUnique({
      where: { id },
      select: {
        id: true,
        appointmentDate: true,
        reason: true,
        channel: true,
        createdById: true,
        bookedById: true,
        bookedByRole: true,
        doctorId: true,
        patientId: true,
        status: true,
        createdAt: true,
        checkedInById: true,
        checkInChannel: true,
        checkInNotes: true,
      },
    });

    if (!r) return null;

    return new Appointment(
      r.id,
      r.appointmentDate,
      r.reason,
      r.channel as BookingChannel,
      r.createdById,
      r.bookedById,
      r.bookedByRole as BookedByRole,
      r.doctorId,
      r.patientId,
      r.status as AppointmentStatus,
      r.createdAt,
      r.checkedInById,
      r.checkInChannel as CheckInChannel | null,
      r.checkInNotes
    );
  }

  async updateStatus(id: string, status: AppointmentStatus): Promise<void> {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    });
  }

  async checkIn(
    id: string,
    checkedInByUserAccountId: string,
    channel: CheckInChannel,
    notes: string
  ): Promise<void> {
    await prisma.appointment.update({
      where: { id },
      data: {
        checkedInById: checkedInByUserAccountId,
        checkInChannel: channel,
        checkInNotes: notes,
        status: AppointmentStatus.COMPLETED,
      },
    });
  }
}
