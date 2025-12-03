import { Router } from "express";
import { EmployeeControllerFactory } from "../factories/EmployeeControllerFactory";

const router = Router();
const controller = EmployeeControllerFactory.create();

router.get("/", (req, res) => controller.list(req, res));
router.post("/", (req, res) => controller.create(req, res));

export default router;
