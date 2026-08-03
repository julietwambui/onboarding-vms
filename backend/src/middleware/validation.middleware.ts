import { Request, Response, NextFunction } from "express";

export function validateCreateVisitor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { 
    fullName,
    email,
    phoneNumber,
    purpose,
   } = req.body;

  if (
    !fullName || typeof fullName !=="string" || fullName.trim() ==="") {
    return res.status(400).json({ error: "fullName is required and must be a non-empty string"});
  }

   if (
    !email ||
    typeof email !== "string" ||
    email.trim() === ""
  ) {
    return res.status(400).json({
      error: "email is required",
    });
  }

  if (
    !phoneNumber ||
    typeof phoneNumber !== "string" ||
    phoneNumber.trim() === ""
  ) {
    return res.status(400).json({
      error: "phoneNumber is required",
    });
  }

  if (!purpose || typeof purpose !== "string" || purpose.trim() === "") {
    return res.status(400).json({error: "purpose is required and must be a non-empty string"});
  }

  next();
}
