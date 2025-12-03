import { Request, Response } from "express";
import { CreatePatientUseCase } from "../../../application/usecases/patients/CreatePatientUseCase";
import { PrismaPatientRepository } from "../../../infrastructure/prisma/PrismaPatientRepository";
import { Patient } from "../../../domain/entities/Patient";

const toJson = (p: Patient) => ({
  id: p.getId(),
  patientId: p.getPatientId(),
  medicalRecordNumber: p.getMedicalRecordNumber(),
  bloodType: p.getBloodType(),
  insuranceProvider: p.getInsuranceProvider(),
  person: {
    id: p.getId(),
    firstName: p.getFirstName(),
    lastName: p.getLastName(),
    dob: p.getDob(),
    gender: p.getGender(),
    address: p.getAddress(),
    phone: p.getPhone(),
    emergencyContacts: p.getEmergencyContacts().map((c) => ({
      id: c.getId(),
      name: c.getName(),
      relation: c.getRelation(),
      phone: c.getPhone(),
    })),
  },
});

export class PatientController {
  static async create(req: Request, res: Response) {
    try {
      const repo = new PrismaPatientRepository();
      const usecase = new CreatePatientUseCase(repo);
      const patient = await usecase.execute(req.body);
      return res
        .status(201)
        .json({ success: true, message: "Patient created", patient: toJson(patient) });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  static async list(req: Request, res: Response) {
    const repo = new PrismaPatientRepository();
    const patients = await repo.findAll();
    return res.json({ success: true, patients: patients.map(toJson) });
  }
}
