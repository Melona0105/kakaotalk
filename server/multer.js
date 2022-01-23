const multer = require("multer");

const storage = multer.diskStorage({
  destination: ".public/uploads",

  //파일이름 설정
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
