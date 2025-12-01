import { IUserAccountRepository } from "../interfaces/IUserAccountRepository";

export class LoginUserUseCase {
  constructor(private repo: IUserAccountRepository) {}

  async execute(username: string, password: string) {
    const user = await this.repo.findByUsername(username);
    if (!user) throw new Error("User not found");

    if (user.getPasswordHash() !== "HASHED:" + password)
      throw new Error("Invalid password");

    user.setLastLoginAt(new Date());

    return user;
  }
}

