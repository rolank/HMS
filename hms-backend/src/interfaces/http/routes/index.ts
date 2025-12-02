import { Router } from "express";
import appointmentRoutes from "./appointment.routes";
import patientRoutes from "./patient.routes";

const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/patients", patientRoutes);

export default router;

