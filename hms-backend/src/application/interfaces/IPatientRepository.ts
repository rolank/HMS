import { Patient } from "../../domain/entities/Patient";

export interface IPatientRepository {
  create(patient: Patient): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
}
