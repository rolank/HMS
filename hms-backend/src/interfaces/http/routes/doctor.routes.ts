import { Router } from "express";
import { DoctorControllerFactory } from "../factories/DoctorControllerFactory";

const router = Router();
const controller = DoctorControllerFactory.create();

router.get("/", (req, res) => controller.list(req, res));
router.post("/", (req, res) => controller.create(req, res));

export default router;
