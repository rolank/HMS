import { Patient } from "../../domain/entities/Patient";

export class PatientMapper {
  static toPrisma(p: Patient) {
    return {
      id: p.getId(),
      patientId: p.getPatientId(),
      medicalRecordNumber: p.getMedicalRecordNumber(),
      bloodType: p.getBloodType(),
      insuranceProvider: p.getInsuranceProvider(),

      person: {
        create: {
          id: p.getId(),
          firstName: p.getFirstName(),
          lastName: p.getLastName(),
          dob: p.getDob(),
          gender: p.getGender(),
          address: p.getAddress(),
          phone: p.getPhone(),

          emergencyContacts: {
            create: p.getEmergencyContacts().map(ec => ({
              id: ec.getId(),
              name: ec.getName(),
              relation: ec.getRelation(),
              phone: ec.getPhone(),
            })),
          },
        },
      },
    };
  }
}
