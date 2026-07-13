import { Request, Response } from "express";
import { createAdmin, login} from "../services/auth.service";

export async function setupAdmin(_req: Request, res: Response) {
  try {
    const admin = await createAdmin();

    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create admin",
    });
  }
}

export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Login failed:", error);

    if (error instanceof Error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to login",
    });
  }
}