import request from "supertest";
import app from "../../app";

describe("Health Check Integration Test", () => {

  it("should return API health status", async () => {

    const response = await request(app)
      .get("/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      status: "ok"
    });

  });

});