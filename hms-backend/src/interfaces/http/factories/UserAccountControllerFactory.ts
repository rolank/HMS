import { PrismaUserAccountRepository } from "../../../infrastructure/prisma/PrismaUserAccountRepository";
import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../../application/use-cases/LoginUserUseCase";
import { UserAccountController } from "../controllers/UserAccountController";

export class UserAccountControllerFactory {
  static create() {
    const repo = new PrismaUserAccountRepository();
    const registerUC = new RegisterUserUseCase(repo);
    const loginUC = new LoginUserUseCase(repo);
    return new UserAccountController(registerUC, loginUC);
  }
}

