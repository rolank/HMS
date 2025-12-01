import { Person } from "./Person";

export class Patient extends Person {
  private patientId: string;
  private medicalRecordNumber: string;
  private bloodType: string;
  private insuranceProvider: string;

  constructor(
    base: Person,
    patientId: string,
    medicalRecordNumber: string,
    bloodType: string,
    insuranceProvider: string
  ) {
    super(
      base.getId(),
      base.getFirstName(),
      base.getLastName(),
      base.getDob(),
      base.getGender(),
      base.getAddress(),
      base.getPhone(),
      base.getEmergencyContacts()
    );
    this.patientId = patientId;
    this.medicalRecordNumber = medicalRecordNumber;
    this.bloodType = bloodType;
    this.insuranceProvider = insuranceProvider;
  }

  getPatientId(): string { return this.patientId; }
  setPatientId(v: string): void { this.patientId = v; }

  getMedicalRecordNumber(): string { return this.medicalRecordNumber; }
  setMedicalRecordNumber(v: string): void { this.medicalRecordNumber = v; }

  getBloodType(): string { return this.bloodType; }
  setBloodType(v: string): void { this.bloodType = v; }

  getInsuranceProvider(): string { return this.insuranceProvider; }
  setInsuranceProvider(v: string): void { this.insuranceProvider = v; }
}
