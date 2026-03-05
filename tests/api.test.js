import { jest } from "@jest/globals";

// Mock node-fetch BEFORE importing the app
jest.unstable_mockModule("node-fetch", () => ({
  default: jest.fn(async () => ({
    json: async () => ({
      cod: 200,
      name: "London",
      main: { temp: 12.3 },
      weather: [{ description: "clear sky" }],
    }),
  })),
}));

const request = (await import("supertest")).default;
const { app } = await import("../netlify/functions/api.js");

describe("Weather API", () => {
  it("should return weather data for a valid city", async () => {
    const res = await request(app).get("/api/weather?city=London");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("city", "London");
    expect(res.body).toHaveProperty("temperature");
    expect(res.body).toHaveProperty("weather");
  });

  it("should return an error for missing city", async () => {
    const res = await request(app).get("/api/weather");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("City is required");
  });
});
