const multer = require("multer");
const app = require("../../app");
const db = require("../../database");

app.post("/upload_images", upload.single("fileupload"), function (req, res) {
  try {
    db().query(
      //파일 주소를 mysql 서버에 저장
      `insert into Users(photo) values ("${req.file.path}")`,
      (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).send();
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
});
