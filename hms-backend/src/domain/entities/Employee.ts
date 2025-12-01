import { Person } from "./Person";

export class Employee extends Person {
  private employeeId: string;
  private department: string;
  private salary: number;
  private email: string;

  constructor(base: Person, employeeId: string, department: string, salary: number, email: string) {
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
    this.employeeId = employeeId;
    this.department = department;
    this.salary = salary;
    this.email = email;
  }

  getEmployeeId(): string { return this.employeeId; }
  setEmployeeId(v: string): void { this.employeeId = v; }

  getDepartment(): string { return this.department; }
  setDepartment(v: string): void { this.department = v; }

  getSalary(): number { return this.salary; }
  setSalary(v: number): void { this.salary = v; }

  getEmail(): string { return this.email; }
  setEmail(v: string): void { this.email = v; }
}
