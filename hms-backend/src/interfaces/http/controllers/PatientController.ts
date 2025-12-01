import { Request, Response } from "express";
import { CreatePatientUseCase } from "../../../application/usecases/patients/CreatePatientUseCase";
import { PrismaPatientRepository } from "../../../infrastructure/prisma/PrismaPatientRepository";

export class PatientController {
  static async create(req: Request, res: Response) {
    const repo = new PrismaPatientRepository();
    const usecase = new CreatePatientUseCase(repo);

    await usecase.execute(req.body);

    return res.status(201).json({ message: "Patient created" });
  }

  static async list(req: Request, res: Response) {
    const repo = new PrismaPatientRepository();
    const result = await repo.findAll();
    return res.json(result);
  }
}
