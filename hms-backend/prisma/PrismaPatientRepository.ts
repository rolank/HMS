import { prisma } from "../../config/prisma";
import { IPatientRepository } from "../../../application/interfaces/IPatientRepository";
import { Patient } from "../../../domain/entities/Patient";

export class PrismaPatientRepository implements IPatientRepository {
  async create(p: Patient): Promise<void> {
    await prisma.patient.create({
      data: {
        id: p.getId(),                       // patient table PK
        patientId: p.getPatientId(),
        medicalRecordNumber: p.getMedicalRecordNumber(),
        bloodType: p.getBloodType(),
        insuranceProvider: p.getInsuranceProvider(),

        // Create related person
        person: {
          create: {
            id: p.getId(),                  // IMPORTANT: same UUID as patient
            firstName: p.getFirstName(),
            lastName: p.getLastName(),
            dob: p.getDob(),
            gender: p.getGender(),
            address: p.getAddress(),
            phone: p.getPhone(),

            // Emergency contacts
            emergencyContacts: {
              create: p.getEmergencyContacts().map((ec) => ({
                id: ec.getId(),
                name: ec.getName(),
                relation: ec.getRelation(),
                phone: ec.getPhone(),
              })),
            },
          },
        },
      },
    });
  }
}
