import { IUserAccountRepository } from "../interfaces/IUserAccountRepository";
import { RegisterUserDTO } from "../dto/RegisterUserDTO";
import { UserAccount } from "../../domain/entities/UserAccount";
import { Person } from "../../domain/entities/Person";
import { AccountStatus } from "../../domain/common/enums";
import { randomUUID } from "crypto";

export class RegisterUserUseCase {
  constructor(private repo: IUserAccountRepository) {}

  async execute(input: RegisterUserDTO) {
    const existing = await this.repo.findByUsername(input.username);
    if (existing) throw new Error("Username already exists");

    const person = new Person(
      randomUUID(),
      input.firstName,
      input.lastName,
      new Date(input.dob),
      input.gender,
      input.address,
      input.phone,
      []
    );

    const user = new UserAccount(
      randomUUID(),
      input.username,
      "HASHED:" + input.password,   // replace with real hash later
      AccountStatus.ACTIVE,
      person
    );

    await this.repo.create(user);
    return user;
  }
}

