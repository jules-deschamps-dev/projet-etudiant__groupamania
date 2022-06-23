console.log("hoo !");

const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("file : ", file);
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    console.log("hey");
    callback(null, name + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
