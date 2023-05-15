import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send("index page");
});

app.use((req, res, next) => {
  res.status(404).send("404 not found!");
});

test("custom 404 page", async () => {
  const response = await request(app).get("/tidak-ada");
  expect(response.text).toBe("404 not found!");
});
