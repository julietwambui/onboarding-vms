import { Router } from "express";
import {
  addMember,
  listMembersByDepartment,
  listAllMembers,
  editMember,
  removeMember,
} from "../controllers/departmentMember.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

export const departmentMemberRouter = Router();

// Admin-only — full roster management
departmentMemberRouter.post("/", authenticate, authorize("ADMIN"), addMember);
departmentMemberRouter.get("/", authenticate, authorize("ADMIN"), listAllMembers);
departmentMemberRouter.put("/:id", authenticate, authorize("ADMIN"), editMember);
departmentMemberRouter.delete("/:id", authenticate, authorize("ADMIN"), removeMember);

departmentMemberRouter.get(
  "/department/:departmentId",
  authenticate,
  authorize("ADMIN", "RECEPTIONIST"),
  listMembersByDepartment
);