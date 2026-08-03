import { Request, Response } from "express";

import {
  findAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/department.service";

export async function getDepartments(
  req: Request,
  res: Response
) {
  try {
    const departments = await findAllDepartments();

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch departments",
    });
  }
}

export async function addDepartment(
  req: Request,
  res: Response
) {
  try {
    const { name } = req.body;

    const department = await createDepartment({
      name,
    });

    res.status(201).json(department);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create department",
    });
  }
}

export async function editDepartment(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params as {id: string};

    const { name } = req.body;

    const department = await updateDepartment(id, {
      name,
    });

    res.status(200).json(department);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update department",
    });
  }
}

export async function removeDepartment(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params as {id: string};

    await deleteDepartment(id);

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete department",
    });
  }
}