import express from "express";
import request from "supertest";

const app = express();

test("response should 'Hello Febri'", async () => {
  app.get("/hello", (req, res) => {
    res.send(`Hello ${req.query.name}`);
  });

  const response = await request(app).get("/hello").query({ name: "Febri" });
  expect(response.text).toBe("Hello Febri");
});
