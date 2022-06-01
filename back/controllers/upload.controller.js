const User = require("../models/auth.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  console.log("uploading");
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/jpeg" &&
      req.file.detectedMimeType !== "image/png"
    )
      throw Error("invalid file format");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const error = uploadErrors(err);
    return res.status(500).json({ error });
  }
  const fileName = req.body.name + ".jpg";
  console.log(fileName);

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );
};

const uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("invalid files"))
    errors.format = "Format incompatible";
  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier est trop volumineux";

  return errors;
};
