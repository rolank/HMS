import { Router } from "express";
import appointmentRoutes from "./appointment.routes";
import patientRoutes from "./patient.routes";
import userAccountRoutes from "./useraccount.routes";
import doctorRoutes from "./doctor.routes";
import employeeRoutes from "./employee.routes";

const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/patients", patientRoutes);
router.use("/useraccount", userAccountRoutes);
router.use("/doctors", doctorRoutes);
router.use("/employees", employeeRoutes);

export default router;
