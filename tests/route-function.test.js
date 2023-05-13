import express from "express";
import request from "supertest";

const app = express();

app
  .route("/")
  .all((req, res, next) => {
    console.log("as a middleware");
    next();
  })
  .get((req, res) => {
    res.send("get method");
  })
  .post((req, res) => {
    res.send("post method");
  })
  .put((req, res) => {
    res.send("put method");
  })
  .delete((req, res) => {
    res.send("delete method");
  });

test("route function", async () => {
  const responseGet = await request(app).get("/");
  const responsePost = await request(app).post("/");
  expect(responseGet.text).toBe("get method");
  expect(responsePost.text).toBe("post method");
});
