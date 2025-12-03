import prisma from "../../config/prisma";
import {
  EmployeeWithPerson,
  IEmployeeRepository,
} from "../../application/interfaces/IEmployeeRepository";

export class PrismaEmployeeRepository implements IEmployeeRepository {
  async create(payload: {
    person: {
      id: string;
      firstName: string;
      lastName: string;
      dob: Date;
      gender: string;
      address: string;
      phone: string;
      emergencyContacts: {
        id: string;
        name: string;
        relation: string;
        phone: string;
      }[];
    };
    employee: {
      employeeId: string;
      department: string;
      salary: number;
      email: string;
    };
  }): Promise<void> {
    const { person, employee } = payload;
    await prisma.employee.create({
      data: {
        employeeId: employee.employeeId,
        department: employee.department,
        salary: employee.salary,
        email: employee.email,
        person: {
          create: {
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            dob: person.dob,
            gender: person.gender,
            address: person.address,
            phone: person.phone,
            emergencyContacts: {
              create: person.emergencyContacts.map((c) => ({
                id: c.id,
                name: c.name,
                relation: c.relation,
                phone: c.phone,
              })),
            },
          },
        },
      },
    });
  }

  async findAll(): Promise<EmployeeWithPerson[]> {
    const employees = await prisma.employee.findMany({
      include: {
        person: {
          include: {
            emergencyContacts: true,
          },
        },
        doctor: true,
      },
    });

    return employees.map((e) => ({
      employeeId: e.employeeId,
      department: e.department,
      salary: e.salary,
      email: e.email,
      person: {
        id: e.person.id,
        firstName: e.person.firstName,
        lastName: e.person.lastName,
        dob: e.person.dob,
        gender: e.person.gender,
        address: e.person.address,
        phone: e.person.phone,
        emergencyContacts: (e.person.emergencyContacts || []).map((c) => ({
          id: c.id,
          name: c.name,
          relation: c.relation,
          phone: c.phone,
        })),
      },
      doctor: e.doctor
        ? {
            specialty: e.doctor.specialty,
            licenseNo: e.doctor.licenseNo,
            qualification: e.doctor.qualification,
          }
        : null,
    }));
  }
}
