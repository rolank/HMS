import { IPatientRepository } from "../../interfaces/IPatientRepository";
import { Patient } from "../../../domain/entities/Patient";
import { Person } from "../../../domain/entities/Person";
import { EmergencyContact } from "../../../domain/value-objects/EmergencyContact";
import { randomUUID } from "crypto";

interface Command {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  emergencyContacts?: {name: string; relation: string; phone: string;}[];
  patientId: string;
  medicalRecordNumber: string;
  bloodType: string;
  insuranceProvider: string;
}

export class CreatePatientUseCase {
  constructor(private repo: IPatientRepository) {}

  async execute(cmd: Command) {
    const person = new Person(
      randomUUID(),
      cmd.firstName,
      cmd.lastName,
      new Date(cmd.dob),
      cmd.gender,
      cmd.address,
      cmd.phone,
      (cmd.emergencyContacts || []).map(
        c => new EmergencyContact(c.name, c.relation, c.phone)
      )
    );

    const patient = new Patient(
      person,
      cmd.patientId,
      cmd.medicalRecordNumber,
      cmd.bloodType,
      cmd.insuranceProvider
    );

    await this.repo.create(patient);
    return patient;
  }
}
