import request from "supertest";
import app from "../../app";

jest.mock("../../middleware/auth.middleware", () => ({
    authenticate: (
        req: any,
        res: any,
        next: any
    ) => {
        next();
    },
}));

describe("Visitor Integration Tests", () => {

    it("should create a visitor successfully", async () => {

        const response = await request(app)
            .post("/visitors")
            .send({
                fullName: "John Doe",
                purpose: "Business meeting"
            });


        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty("id");

        expect(response.body.fullName)
            .toBe("John Doe");

        expect(response.body.purpose)
            .toBe("Business meeting");

    });

    it("should fetch all visitors successfully", async () => {

    const response = await request(app)
        .get("/visitors");


    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body))
        .toBe(true);

});
it("should check in a visitor successfully", async () => {

    // First create a visitor
    const createResponse = await request(app)
        .post("/visitors")
        .send({
            fullName: "Jane Doe",
            purpose: "Interview"
        });


    const visitorId = createResponse.body.id;


    // Check in visitor
    const checkInResponse = await request(app)
        .put(`/visitors/${visitorId}/checkin`);


    expect(checkInResponse.statusCode)
        .toBe(200);


    expect(checkInResponse.body.status)
        .toBe("CHECKED_IN");


    expect(checkInResponse.body.timeIn)
        .toBeTruthy();

});
it("should check out a visitor successfully", async () => {

        // Create visitor
        const createResponse = await request(app)
            .post("/visitors")
            .send({
                fullName: "Mary Jane",
                purpose: "Meeting"
            });


        const visitorId = createResponse.body.id;


        // Check in visitor first
        await request(app)
            .put(`/visitors/${visitorId}/checkin`);


        // Check out visitor
        const checkOutResponse = await request(app)
            .put(`/visitors/${visitorId}/checkout`);


        expect(checkOutResponse.statusCode)
            .toBe(200);


        expect(checkOutResponse.body.status)
            .toBe("CHECKED_OUT");


        expect(checkOutResponse.body.timeOut)
            .toBeTruthy();

    });

});

