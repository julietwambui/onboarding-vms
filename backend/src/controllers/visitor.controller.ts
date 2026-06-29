import { Request, Response } from "express";
import {
  findAll,
  create,
  checkIn,
  checkOut,
}from "../services/visitor.service";


export async function getAllVisitors(_req: Request, res: Response) {
    try{
      const visitors=await findAll();
      res.status(200).json(visitors);
    }catch (error) {
      console.error("Error fetching visitors",error);
      res.status(500).json({message:"Failed to fetch visitors"});
    }
   }
  
export async function createVisitor(req: Request, res: Response) {
  try{
    const{fullName,purpose}=req.body;
    const newVisitor=await create({
      fullName,
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
  
