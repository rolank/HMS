import { Router } from "express";
import { AppointmentControllerFactory } from "../../../interfaces/http/factories/AppointmentControllerFactory"

const router = Router();
const controller = AppointmentControllerFactory.create();

router.post("/", (req, res) => controller.book(req, res));
router.post("/:id/checkin", (req, res) => controller.checkIn(req, res));
router.get("/", (req, res) => controller.list(req, res));

export default router;
