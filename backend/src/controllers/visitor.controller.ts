import { Request, Response } from "express";
import {
  findAll,
  create,
  checkIn,
  checkOut,
  getOverviewStats,
  getFrequentVisitors as getFrequentVisitorsService,
  getWeeklyAnalytics,
  getDepartmentStats,
  getPurposeStats,
  updateVisitor as updateVisitorService,
  deleteVisitor as deleteVisitorService,
}from "../services/visitor.service";


export async function getAllVisitors(req: Request, res: Response) {
    try{
      const search =req.query.search as string | undefined;
      const visitors=await findAll(search);
      res.status(200).json(visitors);
    }catch (error) {
      console.error("Error fetching visitors",error);
      res.status(500).json({message:"Failed to fetch visitors"});
    }
   }
  
export async function createVisitor(req: Request, res: Response) {
  try{
    const{
      fullName,
      email,
      phoneNumber,
      departmentId,
      purpose,
    }=req.body;

    const newVisitor=await create({
      fullName,
      email,
      phoneNumber,
      departmentId,
      purpose,
    });
    res.status(201).json(newVisitor);
  }catch (error){
    console.error("Error creating visitor:",error);
    res.status(500).json({message:"Failed to create visitor"});
  }
    }

export async function checkInVisitor(req: Request, res: Response) {
  try{
    const {id} = req.params as {id:string};
    const updatedVisitor=await checkIn(id);

    res.status(200).json(updatedVisitor);
  }catch (error) {
    console.error("Error checking in visitor:",error);
    if(error instanceof Error && error.message ==="Visitor not found"){
      return res.status(404).json({
        message:error.message,
      });
    }
    return res.status(500).json({message:"Failed to check in visitor"});
  }
  }

export async function checkOutVisitor(req: Request, res: Response) {
  try{
    const {id} =req.params as {id:string};
    const updatedVisitor =await checkOut(id);
    res.status(200).json(updatedVisitor);
  }catch (error){
    console.error("Error checking out visitor:",error);
    if(error instanceof Error && error.message ==="Visitor not found"){
      return res.status(404).json({
        message:error.message,
      });
    }
    return res.status(500).json({message:"Failed to check out visitor"});
  }
  }
  export async function getOverview(req: Request, res: Response) {
  try {
    const stats = await getOverviewStats();

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching overview stats:", error);

    res.status(500).json({
      message: "Failed to fetch overview statistics",
    });
  }
}

export async function getFrequentVisitorsAnalytics(
  req: Request,
  res: Response
) {
  try {
    const visitors = await getFrequentVisitorsService();

    res.status(200).json(visitors);

  } catch (error) {
    console.error("Error fetching frequent visitors:", error);

    res.status(500).json({
      message: "Failed to fetch frequent visitors",
    });
  }
}
  export async function getWeeklyAnalyticsController(
  req: Request,
  res: Response
) {
  try {
    const weekly = await getWeeklyAnalytics();

    res.status(200).json(weekly);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch weekly analytics",
    });
  }
}

export async function getDepartmentAnalyticsController(
  req: Request,
  res: Response
) {
  try {
    const departments = await getDepartmentStats();

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch department analytics",
    });
  }
}

export async function getPurposeAnalyticsController(
  req: Request,
  res: Response
) {
  try {
    const purposes = await getPurposeStats();

    res.status(200).json(purposes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch purpose analytics",
    });
  }
}

export async function updateVisitor(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { fullName, purpose } = req.body;
    const updated = await updateVisitorService(id, { fullName, purpose });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating visitor:", error);
    if (error instanceof Error && error.message === "Visitor not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to update visitor" });
  }
}

export async function deleteVisitor(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    await deleteVisitorService(id);
    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    console.error("Error deleting visitor:", error);
    if (error instanceof Error && error.message === "Visitor not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to delete visitor" });
  }
}