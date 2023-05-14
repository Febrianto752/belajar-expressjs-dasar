import express from "express";
import request from "supertest";

const app = express();

app.get("/send-file", (req, res) => {
  res.sendFile(__dirname + "/contoh.txt"); // jika d luar folder maka kena forbidden?
});

test("request body send file", async () => {
  const response = await request(app).get("/send-file");
  expect(response.text).toContain("Hello World");
});
