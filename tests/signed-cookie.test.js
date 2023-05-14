import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("secretKey-abc"));

app.post("/set-cookie", (req, res) => {
  res.cookie("token", "febri-abc", { path: "/", signed: true });
  res.send("success set signed cookie");
});

app.get("/get-cookie", (req, res) => {
  console.log(req.signedCookies);
  res.send(req.signedCookies.token);
});

test("set signed cookie", async () => {
  const response = await request(app).post("/set-cookie");
  expect(response.get("Set-Cookie")[0]).toContain("febri-abc");
  expect(response.text).toBe("success set signed cookie");
  console.log(response.get("Set-Cookie"));
});

test("get signed cookie", async () => {
  const response = await request(app)
    .get("/get-cookie")
    .set(
      "Cookie",
      "token=s%3Afebri-abc.iQTuY7VWHrcJw3z3%2BBgeXtJdA9KsQHtUqB%2F6JjiledI; Path=/"
    );

  expect(response.text).toBe("febri-abc");
});

test("modified signed cookie", async () => {
  const valueCookieModified =
    "token=s%3Amodified-abc.iQTuY7VWHrcJw3z3%2BBgeXtJdA9KsQHtUqB%2F6JjiledI";

  const response = await request(app)
    .get("/get-cookie")
    .set("Cookie", valueCookieModified);

  expect(response.text).toBe("false");
});
