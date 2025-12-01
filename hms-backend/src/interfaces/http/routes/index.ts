import { Router } from "express";
import patientRoutes from "./patient.routes";
import appointmentRoutes from "./appointment.routes";

const router = Router();
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);

export default router;
