import express from "express";
import request from "supertest";

const app = express();

test("response api should 'Hello Febri'", async () => {
  app.get("/hello", (req, res) => {
    res.send(`Hello ${req.query.name}`);
  });

  const response = await request(app).get("/hello").query({ name: "Febri" });
  expect(response.text).toBe("Hello Febri");
});

test("response api should object json", async () => {
  app.get("/product/:id", (req, res) => {
    res.json({
      originalUrl: req.originalUrl,
      path: req.path,
      hostname: req.hostname,
      protocol: req.protocol,
    });
  });

  const response = await request(app).get("/product/1");
  expect(response.body).toEqual({
    originalUrl: "/product/1",
    path: "/product/1",
    hostname: "127.0.0.1",
    protocol: "http",
  });
});
