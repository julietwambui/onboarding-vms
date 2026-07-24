import { validateCreateVisitor } from "../../middleware/validation.middleware";
import { Request, Response, NextFunction } from "express";

// Helper to create a mock request
const mockRequest = (body: any): Partial<Request> => ({ body });

// Helper to create a mock response
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper to create a mock next function
const mockNext: NextFunction = jest.fn();

describe("validateCreateVisitor middleware", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  // ── fullName tests ────────────────────────────────────────

  test("should call next() when fullName and purpose are valid", () => {
    const req = mockRequest({ fullName: "Jane Mwangi", purpose: "Interview" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should return 400 when fullName is missing", () => {
    const req = mockRequest({ purpose: "Interview" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when fullName is empty string", () => {
    const req = mockRequest({ fullName: "", purpose: "Interview" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when fullName is whitespace only", () => {
    const req = mockRequest({ fullName: "   ", purpose: "Interview" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when fullName is a number", () => {
    const req = mockRequest({ fullName: 123, purpose: "Interview" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  // ── purpose tests ─────────────────────────────────────────

  test("should return 400 when purpose is missing", () => {
    const req = mockRequest({ fullName: "Jane Mwangi" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when purpose is empty string", () => {
    const req = mockRequest({ fullName: "Jane Mwangi", purpose: "" });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when purpose is whitespace only", () => {
    const req = mockRequest({ fullName: "Jane Mwangi", purpose: "   " });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when purpose is a number", () => {
    const req = mockRequest({ fullName: "Jane Mwangi", purpose: 456 });
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 400 when both fullName and purpose are missing", () => {
    const req = mockRequest({});
    const res = mockResponse();

    validateCreateVisitor(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

});