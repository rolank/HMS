import { UUID } from "../common/types";
import { EmergencyContact } from "../value-objects/EmergencyContact";

export class Person {
  private id: UUID;
  private firstName: string;
  private lastName: string;
  private dob: Date;
  private gender: string;
  private address: string;
  private phone: string;
  private emergencyContacts: EmergencyContact[];

  constructor(
    id: UUID,
    firstName: string,
    lastName: string,
    dob: Date,
    gender: string,
    address: string,
    phone: string,
    contacts: EmergencyContact[] = []
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
    this.emergencyContacts = contacts;
  }

  getId(): UUID { return this.id; }

  getFirstName(): string { return this.firstName; }
  setFirstName(v: string): void { this.firstName = v; }

  getLastName(): string { return this.lastName; }
  setLastName(v: string): void { this.lastName = v; }

  getDob(): Date { return this.dob; }
  setDob(v: Date): void { this.dob = v; }

  getGender(): string { return this.gender; }
  setGender(v: string): void { this.gender = v; }

  getAddress(): string { return this.address; }
  setAddress(v: string): void { this.address = v; }

  getPhone(): string { return this.phone; }
  setPhone(v: string): void { this.phone = v; }

  addEmergencyContact(c: EmergencyContact): void { this.emergencyContacts.push(c); }
  removeEmergencyContact(c: EmergencyContact): void {
    this.emergencyContacts = this.emergencyContacts.filter(x => x !== c);
  }
  getEmergencyContacts(): EmergencyContact[] {
    return [...this.emergencyContacts];
  }
}
