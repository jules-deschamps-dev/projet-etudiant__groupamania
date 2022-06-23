const User = require("../models/auth.model");
const fs = require("fs");
const { promisify } = require("util");
const { json } = require("body-parser");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  console.log("uploading !!!!!!!!!!!!!!!!!!!!!!");
  try {
    if (req.file.size > 9200000) throw Error("max size");
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
  const fileName = "user" + req.body.userId + ".png";
  console.log(typeof req.file.buffer);

  let writeStream = fs.createWriteStream(
    `${__dirname}/../../client/public/uploads/profil/${fileName}`
  );
  writeStream.write(req.file.buffer);
  writeStream.on("finish", () => {
    console.log("Fichier mis à jour !");
  });

  writeStream.end();

  User.update(
    {
      picture: `./uploads/profil/${fileName}`,
    },
    { where: { id: req.body.userId } }
  );

  res.status(200).json();
};

const uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("invalid file format"))
    errors.format = "Format incompatible";
  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier est trop volumineux";

  return errors;
};
