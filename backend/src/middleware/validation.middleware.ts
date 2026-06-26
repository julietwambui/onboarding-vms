import { Request, Response, NextFunction } from "express";

export function validateCreateVisitor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { fullName, purpose } = req.body;

  if (!fullName || typeof fullName !=="string" || fullName.trim() ==="") {
    return res.status(400).json({ error: "fullName is required and must be a non-empty string"});
  }

  if (!purpose || typeof purpose !== "string" || purpose.trim() === "") {
    return res.status(400).json({error: "purpose is required and must be a non-empty string"});
  }

  next();
}
