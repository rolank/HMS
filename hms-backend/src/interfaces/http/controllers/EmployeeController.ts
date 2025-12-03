import { Request, Response } from "express";
import { ListEmployeesUseCase } from "../../../application/usecases/employees/ListEmployeesUseCase";
import { CreateEmployeeUseCase } from "../../../application/usecases/employees/CreateEmployeeUseCase";

export class EmployeeController {
  constructor(
    private listUC: ListEmployeesUseCase,
    private createUC: CreateEmployeeUseCase
  ) {}

  async list(_req: Request, res: Response) {
    try {
      const employees = await this.listUC.execute();
      res.json({ success: true, employees });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const employee = await this.createUC.execute(req.body);
      res.status(201).json({ success: true, employee });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}
