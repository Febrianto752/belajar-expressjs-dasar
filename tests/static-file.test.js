import express from "express";
import request from "supertest";
import path from "path";

const app = express();
const app2 = express();

app.use(express.static(__dirname + "/public"));
app2.use("/static", express.static(path.join(__dirname, "public")));

app.get("/contoh1.txt", (req, res) => {
  res.send("hello world");
});

test("static file", async () => {
  const response = await request(app).get("/contoh1.txt");
  const response2 = await request(app).get("/activity-1.png");
  expect(response.text).toBe("contoh1.txt");
  expect(response2.type).toBe("image/png");
});

test("prefix static file", async () => {
  const response = await request(app2).get("/static/contoh1.txt");
  expect(response.text).toBe("contoh1.txt");
});
