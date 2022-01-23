const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //파일이 이미지 파일이면
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      console.log("이미지 파일");
      cb(null, "uploads/images");
    }
  },

  //파일이름 설정
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
