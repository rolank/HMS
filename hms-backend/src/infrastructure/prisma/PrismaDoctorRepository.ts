import prisma from "../../config/prisma";
import { IDoctorRepository } from "../../application/interfaces/IDoctorRepository";
import { Doctor } from "../../domain/entities/Doctor";
import { Employee } from "../../domain/entities/Employee";
import { Person } from "../../domain/entities/Person";
import { EmergencyContact } from "../../domain/value-objects/EmergencyContact";

export class PrismaDoctorRepository implements IDoctorRepository {
  async create(d: Doctor): Promise<Doctor> {
    const created = await prisma.doctor.create({
      data: {
        specialty: d.getSpecialty(),
        licenseNo: d.getLicenseNo(),
        qualification: d.getQualification(),
        employee: {
          create: {
            employeeId: d.getEmployeeId(),
            department: d.getDepartment(),
            salary: d.getSalary(),
            email: d.getEmail(),
            person: {
              create: {
                id: d.getId(),
                firstName: d.getFirstName(),
                lastName: d.getLastName(),
                dob: d.getDob(),
                gender: d.getGender(),
                address: d.getAddress(),
                phone: d.getPhone(),
                emergencyContacts: {
                  create: d.getEmergencyContacts().map((c) => ({
                    id: c.getId(),
                    name: c.getName(),
                    relation: c.getRelation(),
                    phone: c.getPhone(),
                  })),
                },
              },
            },
          },
        },
      },
      include: {
        employee: {
          include: {
            person: { include: { emergencyContacts: true } },
          },
        },
      },
    });

    const person = created.employee.person;
    const contacts = (person.emergencyContacts || []).map(
      (c) => new EmergencyContact(c.name, c.relation, c.phone, c.id)
    );

    const basePerson = new Person(
      person.id,
      person.firstName,
      person.lastName,
      person.dob,
      person.gender,
      person.address,
      person.phone,
      contacts
    );

    const employee = new Employee(
      basePerson,
      created.employee.employeeId,
      created.employee.department,
      created.employee.salary,
      created.employee.email
    );

    return new Doctor(
      created.id,
      employee,
      created.employee.employeeId,
      created.employee.department,
      created.employee.salary,
      created.employee.email,
      created.specialty,
      created.licenseNo,
      created.qualification
    );
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await prisma.doctor.findMany({
      include: {
        employee: {
          include: {
            person: {
              include: {
                emergencyContacts: true,
              },
            },
          },
        },
      },
    });

    return doctors.map((d) => {
      const person = d.employee.person;
      const contacts = (person.emergencyContacts || []).map(
        (c) => new EmergencyContact(c.name, c.relation, c.phone, c.id)
      );

      const basePerson = new Person(
        person.id,
        person.firstName,
        person.lastName,
        person.dob,
        person.gender,
        person.address,
        person.phone,
        contacts
      );

      const employee = new Employee(
        basePerson,
        d.employee.employeeId,
        d.employee.department,
        d.employee.salary,
        d.employee.email
      );

      return new Doctor(
        d.id,
        employee,
        d.employee.employeeId,
        d.employee.department,
        d.employee.salary,
        d.employee.email,
        d.specialty,
        d.licenseNo,
        d.qualification
      );
    });
  }
}
