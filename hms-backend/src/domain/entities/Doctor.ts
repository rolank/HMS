import { Employee } from "./Employee";
import { Person } from "./Person";

export class Doctor extends Employee {
  private specialty: string;
  private licenseNo: string;
  private qualification: string;

  constructor(
    base: Person,
    employeeId: string,
    department: string,
    salary: number,
    email: string,
    specialty: string,
    licenseNo: string,
    qualification: string
  ) {
    super(base, employeeId, department, salary, email);
    this.specialty = specialty;
    this.licenseNo = licenseNo;
    this.qualification = qualification;
  }

  getSpecialty(): string { return this.specialty; }
  setSpecialty(v: string): void { this.specialty = v; }

  getLicenseNo(): string { return this.licenseNo; }
  setLicenseNo(v: string): void { this.licenseNo = v; }

  getQualification(): string { return this.qualification; }
  setQualification(v: string): void { this.qualification = v; }
}
