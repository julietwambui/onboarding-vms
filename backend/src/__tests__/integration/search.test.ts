import request from "supertest";
import app from "../../app";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


describe("GET /visitors?search= (Search Feature)", () => {

    afterAll(async () => {
        await pool.end();
    });

  test("should return all visitors when no search term provided", async () => {
    const response = await request(app)
      .get("/visitors");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("should return only visitors matching the search term", async () => {
    const response = await request(app)
      .get("/visitors?search=Test");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.every((v: any) =>
        v.fullName.toLowerCase().includes("test")
      )
    ).toBe(true);
  });

  test("should return empty array when no visitors match", async () => {
    const response = await request(app)
      .get("/visitors?search=zzznomatchxxx");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("should be case insensitive", async () => {
    const responseLower = await request(app)
      .get("/visitors?search=test");

    const responseUpper = await request(app)
      .get("/visitors?search=TEST");

    expect(responseLower.status).toBe(200);
    expect(responseUpper.status).toBe(200);
    expect(responseLower.body).toEqual(responseUpper.body);
  });

});