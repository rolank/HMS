import { PrismaEmployeeRepository } from "../../../infrastructure/prisma/PrismaEmployeeRepository";
import { ListEmployeesUseCase } from "../../../application/usecases/employees/ListEmployeesUseCase";
import { CreateEmployeeUseCase } from "../../../application/usecases/employees/CreateEmployeeUseCase";
import { EmployeeController } from "../controllers/EmployeeController";

export class EmployeeControllerFactory {
  static create() {
    const repo = new PrismaEmployeeRepository();
    const listUC = new ListEmployeesUseCase(repo);
    const createUC = new CreateEmployeeUseCase(repo);
    return new EmployeeController(listUC, createUC);
    }
}
