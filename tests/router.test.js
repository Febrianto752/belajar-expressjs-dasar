import express from "express";
import request from "supertest";

const app = express();
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("resource users with method get");
});

app.use("/users", userRouter);

test("express router", async () => {
  const response = await request(app).get("/users");

  expect(response.text).toBe("resource users with method get");
});
