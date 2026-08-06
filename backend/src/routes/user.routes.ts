import { Router } from "express";
import {
  registerReceptionist,
  listReceptionists,
  editReceptionist,
  removeReceptionist,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

export const userRouter = Router();

userRouter.post(
  "/receptionists",
  authenticate,
  authorize("ADMIN"),
  registerReceptionist
);

userRouter.get(
  "/receptionists",
  authenticate,
  authorize("ADMIN"),
  listReceptionists
);

userRouter.put(
  "/receptionists/:id",
  authenticate,
  authorize("ADMIN"),
  editReceptionist
);

userRouter.delete(
  "/receptionists/:id",
  authenticate,
  authorize("ADMIN"),
  removeReceptionist
);