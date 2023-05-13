import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/users", (req, res) => {
  console.log(req.body); // output : {name: "febrianto"}
  res.json({ data: `Hello ${req.body.name}` });
});

app.post("/products", (req, res) => {
  console.log(req.body); // output :
  res.json({ data: req.body });
});

test("send request body json type", async () => {
  const response = await request(app)
    .post("/users")
    .set("Content-Type", "application/json")
    .send({ name: "febrianto" });

  expect(response.body).toEqual({ data: "Hello febrianto" });
});

test("send request body data form type", async () => {
  const response = await request(app)
    .post("/products")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send("title=sabun&price=2000");

  expect(response.body).toEqual({ data: { price: "2000", title: "sabun" } });
});
