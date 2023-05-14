import express from "express";
import request from "supertest";

const app = express();

app.get(
  "/",
  (req, res) => {
    throw new Error("something error");
  },
  (req, res) => {
    console.log("ini akan terskip");
    res.send("error");
  },
  (err, req, res, next) => {
    res.status(500).send("error message : " + err.message);
  }
);

test("response error", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("error message : something error");
});
