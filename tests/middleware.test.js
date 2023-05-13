import express from "express";
import request from "supertest";
import { logger, addPoweredHeader, checkApiKey } from "../src/middleware";

const app = express();
app.use([checkApiKey, logger, addPoweredHeader]);
// app.use(checkApiKey);
// app.use(logger);
// app.use(addPoweredHeader);

app.get("/", (req, res) => {
  res.send("Hello World");
});

test("response header should have X-Powered-By attribute", async () => {
  const response = await request(app).get("/").query({ apiKey: "secret" });
  expect(response.get("x-powered-by")).toBe("Febrianto");
  expect(response.get("author")).toBe("febrianto");
  expect(response.text).toBe("Hello World");
});

test("response result should be reject at checkApiKey middleware", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(403);
  expect(response.body).toEqual({ message: "you dont have permission" });
});
