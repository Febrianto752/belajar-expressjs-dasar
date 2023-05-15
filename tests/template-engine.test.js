import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";
import path from "path";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", mustacheExpress());

app.get("/", (req, res) => {
  res.render("index", { title: "say hello", name: "febrianto" });
});

test("template engine mustache express", async () => {
  const response = await request(app).get("/");
  expect(response.text).toContain("Selamat Pagi febrianto");
});
