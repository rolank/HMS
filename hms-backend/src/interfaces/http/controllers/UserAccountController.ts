import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../../application/use-cases/LoginUserUseCase";
import { ListUserAccountsUseCase } from "../../../application/use-cases/ListUserAccountsUseCase";
import { Request, Response } from "express";

export class UserAccountController {
  constructor(
    private registerUC: RegisterUserUseCase,
    private loginUC: LoginUserUseCase,
    private listUC: ListUserAccountsUseCase
  ) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.registerUC.execute(req.body);
      return res.json({ success: true, user });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await this.loginUC.execute(
        req.body.username,
        req.body.password
      );
      return res.json({ success: true, user });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  async list(_req: Request, res: Response) {
    try {
      const users = await this.listUC.execute();
      return res.json({ success: true, users: users.map((u) => ({
        id: u.getId(),
        username: u.getUsername(),
        status: u.getStatus(),
        owner: {
          id: u.getOwner().getId(),
          firstName: u.getOwner().getFirstName(),
          lastName: u.getOwner().getLastName(),
        },
      })) });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }
}
