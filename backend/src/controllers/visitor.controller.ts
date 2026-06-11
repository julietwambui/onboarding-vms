import { Request, Response } from "express";
// TODO: Import your service functions from visitor.service.ts

/**
 * GET /visitors
 * Should return all visitors as a JSON array.
 */
export async function getAllVisitors(_req: Request, res: Response) {
  // TODO: Call the service to retrieve all visitors and send them in the response
  // Handle errors with an appropriate HTTP status code
}

/**
 * POST /visitors
 * Should create a new visitor. Body: { fullName, purpose }
 */
export async function createVisitor(req: Request, res: Response) {
  // TODO: Extract fullName and purpose from req.body
  // TODO: Call the service to create the visitor
  // Respond with HTTP 201 on success
}

/**
 * PUT /visitors/:id/checkin
 * Should mark the visitor as CHECKED_IN.
 */
export async function checkInVisitor(req: Request, res: Response) {
  // TODO: Get the visitor id from req.params
  // TODO: Call the service to check in the visitor
  // Return 404 if the visitor does not exist
}

/**
 * PUT /visitors/:id/checkout
 * Should mark the visitor as CHECKED_OUT.
 */
export async function checkOutVisitor(req: Request, res: Response) {
  // TODO: Get the visitor id from req.params
  // TODO: Call the service to check out the visitor
  // Return 404 if the visitor does not exist
}
