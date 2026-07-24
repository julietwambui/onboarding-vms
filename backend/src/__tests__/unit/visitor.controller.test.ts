import { Request, Response } from "express";
import { createVisitor,checkInVisitor
} from "../../controllers/visitor.controller";
import * as visitorService from "../../services/visitor.service";

// Mock the service
jest.mock("../../services/visitor.service");

describe("Visitor Controller", () => {
    beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a visitor successfully", async () => {

    const req = {
      body: {
        fullName: "Jane Mwangi",
        purpose: "Interview",
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (visitorService.create as jest.Mock).mockResolvedValue({
      id: "123",
      fullName: "Jane Mwangi",
      purpose: "Interview",
      status: "PENDING",
    });

    await createVisitor(req, res);

    expect(visitorService.create).toHaveBeenCalledWith({
      fullName: "Jane Mwangi",
      purpose: "Interview",
    });

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      id: "123",
      fullName: "Jane Mwangi",
      purpose: "Interview",
      status: "PENDING",
    });

  });
  test("should return 500 when visitor creation fails", async () => {

  const req = {
    body: {
      fullName: "Jane Mwangi",
      purpose: "Interview",
    },
  } as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  (visitorService.create as jest.Mock).mockRejectedValue(
    new Error("Database error")
  );

  await createVisitor(req, res);

  expect(res.status).toHaveBeenCalledWith(500);

  expect(res.json).toHaveBeenCalledWith({
    message: "Failed to create visitor",
  });

});
test("should check in a visitor successfully", async () => {

    const req = {
      params: {
        id: "123",
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (visitorService.checkIn as jest.Mock).mockResolvedValue({
      id: "123",
      status: "CHECKED_IN",
    });

    await checkInVisitor(req, res);

    expect(visitorService.checkIn).toHaveBeenCalledWith("123");

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      id: "123",
      status: "CHECKED_IN",
    });

  });

  
  test("should return 404 when visitor is not found", async () => {

    const req = {
      params: {
        id: "999",
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (visitorService.checkIn as jest.Mock).mockRejectedValue(
      new Error("Visitor not found")
    );

    await checkInVisitor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      message: "Visitor not found",
    });

  });

});
