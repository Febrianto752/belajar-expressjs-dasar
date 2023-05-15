import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";

const app = express();
app.use(expressFileUpload());

app.post("/upload-file", async (req, res) => {
  const fileImage = req.files.image;
  // function mv() jika terdapat nama file yang sama maka akan di rewrite
  await fileImage.mv(__dirname + "/public/files/" + fileImage.name);

  res.send(`Hello ${req.body.name}, you upload ${fileImage.name}`);
});

test("upload file", async () => {
  const response = await request(app)
    .post("/upload-file")
    .set("Content-Type", "multipart/form-data")
    .field("name", "febrianto")
    .attach("image", __dirname + "/public/activity-1.png");

  expect(response.text).toBe("Hello febrianto, you upload activity-1.png");
});
