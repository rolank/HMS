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
    const data = await prisma.patient.findUnique({
      where: { id },
      include: {
        person: {
          include: { emergencyContacts: true }
        }
      }
    });
    return data ? PrismaPatientRepository.toDomain(data) : null;
  }

  async findAll(): Promise<Patient[]> {
    const list = await prisma.patient.findMany({
      include: {
        person: {
          include: { emergencyContacts: true }
        }
      }
    });
    return list.map(PrismaPatientRepository.toDomain);
  }

  static toDomain(d: any): Patient {
    const person = d.person || {};
    const contacts = (person.emergencyContacts || []).map(
      (c: any) => new EmergencyContact(c.name, c.relation, c.phone, c.id)
    );

    const base = new Person(
      person.id || d.id,
      person.firstName,
      person.lastName,
      person.dob,
      person.gender,
      person.address,
      person.phone,
      contacts
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
