import express from "express";

import request from "supertest";

const app = express();

test("response status should 200", async () => {
  app.get("/", (req, res) => {
    res.status(200).end();
  });

  const response = await request(app).get("/");
  expect(response.status).toBe(200);
});
