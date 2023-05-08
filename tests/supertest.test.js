import { app } from "../src";
import request from "supertest";

test("response should 'Hello World'", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World");
});
