const request = require("supertest");
const app = require("../index");

describe("GET /romannumeral", () => {
  it("should return Roman numeral for valid input", async () => {
    const res = await request(app).get("/romannumeral?query=123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ input: "123", output: "CXXIII" });
  });

  it("should return 400 for input below range", async () => {
    const res = await request(app).get("/romannumeral?query=0");
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Invalid input/);
  });

  it("should return 400 for input above range", async () => {
    const res = await request(app).get("/romannumeral?query=4000");
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Invalid input/);
  });
});
