import { Request, Response } from "express";
import {
  createReceptionist,
  getAllReceptionists,
  updateReceptionist,
  deleteReceptionist,
} from "../services/user.service";

export async function registerReceptionist(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, and password are all required",
      });
    }

    const receptionist = await createReceptionist(name, email, password);

    res.status(201).json({
      message: "Receptionist created successfully",
      receptionist,
    });
  } catch (error) {
    console.error("Error creating receptionist:", error);

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to create receptionist" });
  }
}

export async function listReceptionists(_req: Request, res: Response) {
  try {
    const receptionists = await getAllReceptionists();
    res.status(200).json(receptionists);
  } catch (error) {
    console.error("Error fetching receptionists:", error);
    return res.status(500).json({ message: "Failed to fetch receptionists" });
  }
}

export async function editReceptionist(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { name, email } = req.body;

    const updated = await updateReceptionist(id, { name, email });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating receptionist:", error);

    if (error instanceof Error && error.message === "Receptionist not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to update receptionist" });
  }
}

export async function removeReceptionist(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await deleteReceptionist(id);

    res.status(200).json({ message: "Receptionist deleted successfully" });
  } catch (error) {
    console.error("Error deleting receptionist:", error);

    if (error instanceof Error && error.message === "Receptionist not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to delete receptionist" });
  }
}