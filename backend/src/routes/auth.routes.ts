import { Router } from "express";
import {
     setupAdmin,
     loginAdmin,
    } from "../controllers/auth.controller";
import { loginLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/setup-admin", setupAdmin);
router.post("/login", loginLimiter, loginAdmin);

export default router;