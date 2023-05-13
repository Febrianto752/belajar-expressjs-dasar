import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.redirect(302, "/maintenance");
});

// app.get("/maintenance", (req, res) => {
//   res.send("maintenance..");
// });
test("should redirect to '/maintenance' and status 302", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(302);
  expect(response.get("Location")).toBe("/maintenance");
});
