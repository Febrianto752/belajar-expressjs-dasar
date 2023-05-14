import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.cookies); // output : {name: "febrianto", age: "28"}
  // const name = req.cookies["name"];
  res.json({ name: "febrianto" });
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("token", "secretKey-" + name, { path: "/" }); // di header : 'set-cookie': [ 'token=secretKey-febrianto; Path=/' ],
  res.send("Hello " + name);
});

// app.post("/signed", (req ,res)=>{
//   res.cookie("token-signed", "febrianto")
// })

test("request cookie", async () => {
  const response = await request(app)
    .get("/")
    .set("Cookie", "name=febrianto;age=28");
  expect(response.body).toEqual({ name: "febrianto" });
});

test("set response cookie", async () => {
  const response = await request(app)
    .post("/login")
    .send({ name: "febrianto" });

  expect(response.get("Set-Cookie")[0]).toContain("token=secretKey-febrianto");
  expect(response.text).toBe("Hello febrianto");
});
