const User = require("../models/auth.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  console.log("uploading !!!!!!!!!!!!!!!!!!!!!!");
  console.log(req.file.mimetype);
  try {
    if (req.file.size > 500000000000) throw Error("max size");
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png"
    )
      throw Error("invalid file format");
  } catch (err) {
    const error = uploadErrors(err);
    return res.status(500).json({ error });
  }
  const fileName = req.body.id + ".png";
  console.log(fileName);

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../client/public/uploads/profil/${fileName}`
    )
  );
};

const uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("invalid file format"))
    errors.format = "Format incompatible";
  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier est trop volumineux";

  return errors;
};
