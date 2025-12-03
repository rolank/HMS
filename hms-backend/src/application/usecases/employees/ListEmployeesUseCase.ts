import { IEmployeeRepository } from "../../interfaces/IEmployeeRepository";

export class ListEmployeesUseCase {
  constructor(private repo: IEmployeeRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
