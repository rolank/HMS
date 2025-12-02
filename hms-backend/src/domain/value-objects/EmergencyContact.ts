import { randomUUID } from "crypto";

export class EmergencyContact {
  private id: string;
  private name: string;
  private relation: string;
  private phone: string;

  constructor(name: string, relation: string, phone: string, id: string = randomUUID()) {
    this.id = id;
    this.name = name;
    this.relation = relation;
    this.phone = phone;
  }

  getId(): string { return this.id; }

  getName(): string { return this.name; }
  setName(v: string): void { this.name = v; }

  getRelation(): string { return this.relation; }
  setRelation(v: string): void { this.relation = v; }

  getPhone(): string { return this.phone; }
  setPhone(v: string): void { this.phone = v; }
}
