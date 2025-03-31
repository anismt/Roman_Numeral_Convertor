const request = require("supertest");
const app = require("../index");

describe("GET /romannumeral", () => {
  it("should return Roman numeral for 10", async () => {
    const res = await request(app).get("/romannumeral?query=10");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ input: "10", output: "X" });
  });

  it("should return 400 for zero", async () => {
    const res = await request(app).get("/romannumeral?query=0");
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Invalid input/);
  });

  it("should return 400 for too large number", async () => {
    const res = await request(app).get("/romannumeral?query=4000");
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Invalid input/);
  });

  it("should return 400 for missing query param", async () => {
    const res = await request(app).get("/romannumeral");
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Invalid input/);
  });

  it("should return 400 for non-numeric input", async () => {
    const res = await request(app).get("/romannumeral?query=abc");
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/Invalid input/);
  });
});
