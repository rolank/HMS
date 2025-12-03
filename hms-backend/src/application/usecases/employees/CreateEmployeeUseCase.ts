import { IEmployeeRepository } from "../../interfaces/IEmployeeRepository";
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
}

export class CreateEmployeeUseCase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(cmd: Command) {
    const personId = randomUUID();
    const contacts =
      cmd.emergencyContacts?.map((c) => ({
        id: randomUUID(),
        name: c.name,
        relation: c.relation,
        phone: c.phone,
      })) || [];

    await this.repo.create({
      person: {
        id: personId,
        firstName: cmd.firstName,
        lastName: cmd.lastName,
        dob: new Date(cmd.dob),
        gender: cmd.gender,
        address: cmd.address,
        phone: cmd.phone,
        emergencyContacts: contacts,
      },
      employee: {
        employeeId: cmd.employeeId,
        department: cmd.department,
        salary: Number(cmd.salary),
        email: cmd.email,
      },
    });

    return {
      employeeId: cmd.employeeId,
      department: cmd.department,
      salary: Number(cmd.salary),
      email: cmd.email,
      person: {
        id: personId,
        firstName: cmd.firstName,
        lastName: cmd.lastName,
        dob: new Date(cmd.dob),
        gender: cmd.gender,
        address: cmd.address,
        phone: cmd.phone,
        emergencyContacts: contacts,
      },
    };
  }
}
