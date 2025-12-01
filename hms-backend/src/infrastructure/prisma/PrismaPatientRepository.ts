import { IPatientRepository } from "../../application/interfaces/IPatientRepository";
import prisma from "../../config/prisma";
import { PatientMapper } from "../mappers/PatientMapper";
import { Patient } from "../../domain/entities/Patient";
import { EmergencyContact } from "../../domain/value-objects/EmergencyContact";
import { Person } from "../../domain/entities/Person";

export class PrismaPatientRepository implements IPatientRepository {
  async create(p: Patient): Promise<void> {
    await prisma.patient.create({
      data: PatientMapper.toPrisma(p)
    });
  }

  async findById(id: string): Promise<Patient | null> {
    const data = await prisma.patient.findUnique({ where: { id } });
    return data ? PrismaPatientRepository.toDomain(data) : null;
  }

  async findAll(): Promise<Patient[]> {
    const list = await prisma.patient.findMany();
    return list.map(PrismaPatientRepository.toDomain);
  }

  static toDomain(d: any): Patient {
    const base = new Person(
      d.id,
      d.firstName,
      d.lastName,
      d.dob,
      d.gender,
      d.address,
      d.phone,
      (d.emergencyContacts || []).map(
        (c: any) => new EmergencyContact(c.name, c.relation, c.phone)
      )
    );

    return new Patient(
      base,
      d.patientId,
      d.medicalRecordNumber,
      d.bloodType,
      d.insuranceProvider
    );
  }
}
