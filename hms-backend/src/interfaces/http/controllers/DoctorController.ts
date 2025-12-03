import { Request, Response } from "express";
import { ListDoctorsUseCase } from "../../../application/usecases/doctors/ListDoctorsUseCase";
import { CreateDoctorUseCase } from "../../../application/usecases/doctors/CreateDoctorUseCase";
import { Doctor } from "../../../domain/entities/Doctor";

const toJson = (d: Doctor) => ({
  id: d.getDoctorId(),
  employeeId: d.getEmployeeId(),
  specialty: d.getSpecialty(),
  licenseNo: d.getLicenseNo(),
  qualification: d.getQualification(),
  department: d.getDepartment(),
  salary: d.getSalary(),
  email: d.getEmail(),
  person: {
    id: d.getId(),
    firstName: d.getFirstName(),
    lastName: d.getLastName(),
    dob: d.getDob(),
    gender: d.getGender(),
    address: d.getAddress(),
    phone: d.getPhone(),
    emergencyContacts: d.getEmergencyContacts().map((c) => ({
      id: c.getId(),
      name: c.getName(),
      relation: c.getRelation(),
      phone: c.getPhone(),
    })),
  },
});

export class DoctorController {
  constructor(
    private listUC: ListDoctorsUseCase,
    private createUC: CreateDoctorUseCase
  ) {}

  async list(_req: Request, res: Response) {
    try {
      const doctors = await this.listUC.execute();
      res.json({ success: true, doctors: doctors.map(toJson) });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const doctor = await this.createUC.execute(req.body);
      res.status(201).json({ success: true, doctor: toJson(doctor) });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}
