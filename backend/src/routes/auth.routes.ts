import { Router } from "express";
import {
     setupAdmin,
     loginAdmin,
    } from "../controllers/auth.controller";

const router = Router();

router.post("/setup-admin", setupAdmin);
router.post("/login", loginAdmin);

export default router;