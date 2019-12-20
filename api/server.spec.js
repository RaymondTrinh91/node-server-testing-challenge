const request = require("supertest");

const server = require("./server.js");

describe("server.js", function () {
    describe("environment", function () {
        it("DB_ENV should be set to testing", function () {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("GET /", function () {
        it("Should return a 200", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should return {api: 'up'}", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.body.api).toBe("up");
                });
        });
    });
});
