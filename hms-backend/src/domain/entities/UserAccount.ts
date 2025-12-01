import { UUID } from "../common/types";
import { AccountStatus } from "../common/enums";
import { Person } from "./Person";

export class UserAccount {
  private userId: UUID;
  private username: string;
  private passwordHash: string;
  private status: AccountStatus;
  private lastLoginAt: Date | null;
  private owner: Person;

  constructor(
    userId: UUID,
    username: string,
    passwordHash: string,
    status: AccountStatus,
    owner: Person,
    lastLoginAt: Date | null = null
  ) {
    this.userId = userId;
    this.username = username;
    this.passwordHash = passwordHash;
    this.status = status;
    this.owner = owner;
    this.lastLoginAt = lastLoginAt;
  }

  getUserId(): UUID { return this.userId; }
  getUsername(): string { return this.username; }
  setUsername(v: string): void { this.username = v; }

  getPasswordHash(): string { return this.passwordHash; }
  setPasswordHash(v: string): void { this.passwordHash = v; }

  getStatus(): AccountStatus { return this.status; }
  setStatus(v: AccountStatus): void { this.status = v; }

  getLastLoginAt(): Date | null { return this.lastLoginAt; }
  setLastLoginAt(v: Date | null): void { this.lastLoginAt = v; }

  getOwner(): Person { return this.owner; }
  setOwner(v: Person): void { this.owner = v; }
}
