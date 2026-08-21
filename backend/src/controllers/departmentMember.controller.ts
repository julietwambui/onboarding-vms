import { Request, Response } from "express";
import {
  createMember,
  getMembersByDepartment,
  getAllMembers,
  updateMember,
  deleteMember,
} from "../services/departmentMember.service";

export async function addMember(req: Request, res: Response) {
  try {
    const { name, email, role, departmentId } = req.body;

    if (!name || !role || !departmentId) {
      return res.status(400).json({
        message: "name, role, and departmentId are required",
      });
    }

    const member = await createMember({ name, email, role, departmentId });

    res.status(201).json(member);
  } catch (error) {
    console.error("Error creating department member:", error);
    return res.status(500).json({ message: "Failed to create department member" });
  }
}

export async function listMembersByDepartment(req: Request, res: Response) {
  try {
    const departmentId = req.params.departmentId as string;
    const members = await getMembersByDepartment(departmentId);
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching department members:", error);
    return res.status(500).json({ message: "Failed to fetch department members" });
  }
}

export async function listAllMembers(_req: Request, res: Response) {
  try {
    const members = await getAllMembers();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({ message: "Failed to fetch members" });
  }
}

export async function editMember(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { name, email, role } = req.body;

    const updated = await updateMember(id, { name, email, role });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating department member:", error);

    if (error instanceof Error && error.message === "Department member not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to update department member" });
  }
}

export async function removeMember(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await deleteMember(id);

    res.status(200).json({ message: "Department member deleted successfully" });
  } catch (error) {
    console.error("Error deleting department member:", error);

    if (error instanceof Error && error.message === "Department member not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to delete department member" });
  }
}