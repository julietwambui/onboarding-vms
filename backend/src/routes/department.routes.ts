import { Router } from "express";

import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  removeDepartment,
} from "../controllers/department.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getDepartments);

router.get("/:id", getDepartment);
router.post("/", authenticate, authorize("ADMIN"),addDepartment);

router.put("/:id", authenticate, authorize("ADMIN"), editDepartment);

router.delete("/:id", authenticate, authorize("ADMIN"), removeDepartment);

export default router;