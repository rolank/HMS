import { IAppointmentRepository } from "../../interfaces/IAppointmentRepository";

export class ListAppointmentsUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
