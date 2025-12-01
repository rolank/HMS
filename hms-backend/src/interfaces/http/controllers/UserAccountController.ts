import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../../application/use-cases/LoginUserUseCase";

export class UserAccountController {
  constructor(
    private registerUC: RegisterUserUseCase,
    private loginUC: LoginUserUseCase
  ) {}

  async register(req, res) {
    try {
      const user = await this.registerUC.execute(req.body);
      return res.json({ success: true, user });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  async login(req, res) {
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
}

