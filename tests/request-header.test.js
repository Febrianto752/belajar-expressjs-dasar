import express from "express";
import request from "supertest";

const app = express();

test("response should return value in request header", async () => {
  app.get("/", (req, res) => {
    const acceptHeader = req.get("accept");
    res.send(acceptHeader);
  });

  const response = await request(app).get("/").set("Accept", "text/plain");

  expect(response.text).toBe("text/plain");
});
