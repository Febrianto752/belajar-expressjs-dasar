import express from "express";
import cookieParser from "cookie-parser";

export const app = express();
app.use(express.json());
app.use(cookieParser("secretKey"));

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.cookie("test", "hello world", { path: "/", signed: true });
  res.send("Success set cookie");
});

app.get("/login", (req, res) => {
  console.log("req cookies : ", req.cookies);
  console.log("req signed cookie", req.signedCookies);
  res.send("login url success");
});

app.get("/admin", (req, res) => {
  console.log("in /admin", req.cookies);
  res.send("admin url on");
});

app.get("/admin/febri", (req, res) => {
  console.log("in /admin/febri", req.cookies);
  res.send("admin febri on");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
