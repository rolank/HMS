import { PrismaDoctorRepository } from "../../../infrastructure/prisma/PrismaDoctorRepository";
import { ListDoctorsUseCase } from "../../../application/usecases/doctors/ListDoctorsUseCase";
import { CreateDoctorUseCase } from "../../../application/usecases/doctors/CreateDoctorUseCase";
import { DoctorController } from "../controllers/DoctorController";

export class DoctorControllerFactory {
  static create() {
    const repo = new PrismaDoctorRepository();
    const listUC = new ListDoctorsUseCase(repo);
    const createUC = new CreateDoctorUseCase(repo);
    return new DoctorController(listUC, createUC);
  }
}
