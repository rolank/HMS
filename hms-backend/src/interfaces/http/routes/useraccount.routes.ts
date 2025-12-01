import { Router } from "express";
import { UserAccountControllerFactory } from "../factories/UserAccountControllerFactory";

const router = Router();
const controller = UserAccountControllerFactory.create();

router.post("/register", (req, res) => controller.register(req, res));
router.post("/login", (req, res) => controller.login(req, res));

export default router;

