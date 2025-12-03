import { Router } from "express";
import { UserAccountControllerFactory } from "../factories/UserAccountControllerFactory";

const router = Router();
const controller = UserAccountControllerFactory.create();

// Helpful GET to show route availability (avoids 404 confusion)
router.get("/register", (_req, res) =>
  res.json({ message: "Use POST /api/v1/useraccount/register with JSON body to create a user" })
);

router.post("/register", (req, res) => controller.register(req, res));
router.post("/login", (req, res) => controller.login(req, res));

export default router;
