import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "febrianto752",
    "X-Author": "febrianto",
  });
  res.send("Response Success");
});

test("response header must have x-powered-by and x-author attribute", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Response Success");
  expect(response.get("X-Powered-By")).toBe("febrianto752");
  expect(response.get("X-Author")).toBe("febrianto");
});
