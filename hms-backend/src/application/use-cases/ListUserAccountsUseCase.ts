import { IUserAccountRepository } from "../interfaces/IUserAccountRepository";

export class ListUserAccountsUseCase {
  constructor(private repo: IUserAccountRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
