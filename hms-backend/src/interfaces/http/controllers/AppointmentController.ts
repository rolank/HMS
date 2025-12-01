import { Request, Response } from "express";
import { BookAppointmentUseCase } from "../../../application/usecases/appointments/BookAppointmentUseCase";
import { ListAppointmentsUseCase } from "../../../application/usecases/appointments/ListAppointmentsUseCase";
import { CheckInAppointmentUseCase } from "../../../application/usecases/appointments/CheckInAppointmentUseCase";
import prisma from "../../../infrastructure/config/prisma";

export class AppointmentController {
  constructor(
    private bookUC: BookAppointmentUseCase,
    private listUC: ListAppointmentsUseCase,
    private checkInUC: CheckInAppointmentUseCase
  ) {}

  async book(req: Request, res: Response) {
    try {
      await this.bookUC.execute(req.body);
      res.json({ message: "Appointment booked" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    const data = await this.listUC.execute();
    res.json(data);
  }

  async checkIn(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userAccountId, channel, notes } = req.body;

      await this.checkInUC.execute(id, userAccountId, channel, notes);

      res.json({ message: "Checked in successfully" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}
