import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  console.log(req.params);
  res.status(200).json({ message: "success" });
});

// nilai parameter hanya boleh angka
app.get("/categories/:id(\\d+)", (req, res) => {
  console.log(req.params);
  res.status(200).json({ message: "success" });
});

test("request regex path", async () => {
  const response = await request(app).get("/products/data.json");
  const response2 = await request(app).get("/categories/123");
  expect(response.body).toEqual({ message: "success" });
});
