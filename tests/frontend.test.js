/** @jest-environment jsdom */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(
  path.resolve(__dirname, "../frontend/index.html"),
  "utf8",
);

describe("Weather App UI", () => {
  beforeEach(() => {
    // Jest provides window/document via testEnvironment: "jsdom"
    document.documentElement.innerHTML = html;
  });

  it("should have an input field", () => {
    const input = document.querySelector("#city");
    expect(input).not.toBeNull();
  });

  it("should have a button", () => {
    const button = document.querySelector("button");
    expect(button.textContent).toBe("Get Weather");
  });
});
