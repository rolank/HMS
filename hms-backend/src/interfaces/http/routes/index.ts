import { Router } from "express";
import patientRoutes from "./patient.routes";
import appointmentRoutes from "./appointment.routes";
import userAccountRoutes from "./useraccount.routes";


const router = Router();
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/auth", userAccountRoutes);

export default router;
