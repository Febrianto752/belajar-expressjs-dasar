import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const app = express();
app.use(express.json());
app.use(cookieParser("secretKey"));
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/send-file", (req, res) => {
  console.log("send file url");
  res.sendFile(__dirname + "/index.html");
});

app.get("/download-file", (req, res) => {
  res.download(__dirname + "/contoh.txt", "contoh.txt", function (err) {
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
      console.log("error : ", err);
    } else {
      console.log("anything is fine");
      // decrement a download credit, etc.
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
