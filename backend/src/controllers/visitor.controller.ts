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
      res.status(500).json({message:"Failed to fatch visitors"});
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
    res.status(404).json({message:"Visitor not found"});
  }
  }

export async function checkOutVisitor(req: Request, res: Response) {
  try{
    const {id} =req.params as {id:string};
    const updatedVisitor =await checkOut(id);
    res.status(200).json(updatedVisitor);
  }catch (error){
    console.error("Error checking out visitor:",error);
    res.status(404).json({message:"Visitor not found"});
  }
  }
  
