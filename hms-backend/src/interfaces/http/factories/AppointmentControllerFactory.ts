import { PrismaAppointmentRepository } from "../../../infrastructure/prisma/PrismaAppointmentRepository";
import { BookAppointmentUseCase } from "../../../application/usecases/appointments/BookAppointmentUseCase";
import { ListAppointmentsUseCase } from "../../../application/usecases/appointments/ListAppointmentsUseCase";
import { CheckInAppointmentUseCase } from "../../../application/usecases/appointments/CheckInAppointmentUseCase";

import { AppointmentController } from "../controllers/AppointmentController";

export class AppointmentControllerFactory {
  static create() {
    // Repository
    const repo = new PrismaAppointmentRepository();

    // Use cases
    const bookUC = new BookAppointmentUseCase(repo);
    const listUC = new ListAppointmentsUseCase(repo);
    const checkInUC = new CheckInAppointmentUseCase(repo);

    // Controller
    return new AppointmentController(bookUC, listUC, checkInUC);
  }
}
