import prisma from "../../config/prisma";
import { IAppointmentRepository } from "../../../application/interfaces/IAppointmentRepository";
import { Appointment } from "../../../domain/entities/Appointment";

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async create(a: Appointment): Promise<void> {
    await prisma.appointment.create({
      data: a.toPrisma()
    });
  }

  async findById(id: string): Promise<any> {
    return prisma.appointment.findUnique({ where: { id } });
  }

  async findAll(): Promise<any[]> {
    return prisma.appointment.findMany();
  }

  async updateStatus(id: string, status: any): Promise<void> {
    await prisma.appointment.update({
      where: { id },
      data: { status }
    });
  }
}

