import { Request, Response, NextFunction } from "express";

/**
 * Middleware: Validates the request body for POST /visitors.
 *
 * Single Responsibility: This function ONLY validates.
 * It should NOT create records or interact with the database.
 *
 * If validation passes, call next() to proceed to the controller.
 * If validation fails, respond with HTTP 400 and a descriptive error message.
 */
export function validateCreateVisitor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: Check that req.body.fullName exists, is a string, and is not empty
  // TODO: Check that req.body.purpose exists, is a string, and is not empty
  // TODO: If either check fails, return res.status(400).json({ error: "..." })
  // TODO: If both pass, call next()
}
