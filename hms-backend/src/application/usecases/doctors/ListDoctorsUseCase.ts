import { IDoctorRepository } from "../../interfaces/IDoctorRepository";

export class ListDoctorsUseCase {
  constructor(private repo: IDoctorRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
