import { IDoctorRepository } from "../../interfaces/IDoctorRepository";
import { Doctor } from "../../../domain/entities/Doctor";
import { Person } from "../../../domain/entities/Person";
import { EmergencyContact } from "../../../domain/value-objects/EmergencyContact";
import { randomUUID } from "crypto";

interface Command {
  firstName: string;
  lastName: string;
  dob: string | Date;
  gender: string;
  address: string;
  phone: string;
  emergencyContacts?: { name: string; relation: string; phone: string }[];

  employeeId: string;
  department: string;
  salary: number;
  email: string;

  specialty: string;
  licenseNo: string;
  qualification: string;
}

export class CreateDoctorUseCase {
  constructor(private repo: IDoctorRepository) {}

  async execute(cmd: Command) {
    const contacts =
      cmd.emergencyContacts?.map(
        (c) => new EmergencyContact(c.name, c.relation, c.phone)
      ) || [];

    const person = new Person(
      randomUUID(),
      cmd.firstName,
      cmd.lastName,
      new Date(cmd.dob),
      cmd.gender,
      cmd.address,
      cmd.phone,
      contacts
    );

    const doctor = new Doctor(
      randomUUID(), // doctorId (will be overwritten by repo create)
      person,
      cmd.employeeId,
      cmd.department,
      Number(cmd.salary),
      cmd.email,
      cmd.specialty,
      cmd.licenseNo,
      cmd.qualification
    );

    return this.repo.create(doctor);
  }
}
