import { Router } from "express";

import {
  getDepartments,
  addDepartment,
  editDepartment,
  removeDepartment,
} from "../controllers/department.controller";

const router = Router();

router.get("/", getDepartments);

router.post("/", addDepartment);

router.put("/:id", editDepartment);

router.delete("/:id", removeDepartment);

export default router;