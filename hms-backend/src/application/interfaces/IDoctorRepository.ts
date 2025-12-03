import { Doctor } from "../../domain/entities/Doctor";

export interface IDoctorRepository {
  findAll(): Promise<Doctor[]>;
  create(d: Doctor): Promise<Doctor>;
}
