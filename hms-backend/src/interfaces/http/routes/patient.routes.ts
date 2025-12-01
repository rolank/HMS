import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const router = Router();

router.post("/", PatientController.create);
router.get("/", PatientController.list);

export default router;
