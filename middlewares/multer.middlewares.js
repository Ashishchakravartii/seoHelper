const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    let modifiedName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, modifiedName);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
