const Post = require("../models/post.model");
const User = require("../models/auth.model");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const fs = require("fs");
const { promisify } = require("util");
const { json } = require("body-parser");
const pipeline = promisify(require("stream").pipeline);

exports.newPost = (req, res) => {
  let fileName;
  if (req.file) {
    try {
      if (req.file.size > 512000) throw Error("maxSize");
      if (
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/jpeg" &&
        req.file.mimetype !== "image/png"
      )
        throw Error("invalid file format");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(500).json({ errors });
    }
    fileName = req.body.author + Date.now() + ".jpg";
    console.log(fileName);

    let writeStream = fs.createWriteStream(
      `${__dirname}/../../client/public/uploads/posts/${fileName}`
    );
    writeStream.write(req.file.buffer);
    writeStream.on("finish", () => {
      console.log("Image postée");
    });

    writeStream.end();
  } else {
    console.log("no FILE !!");
  }
  Post.create({
    content: req.body.content,
    author: req.body.author,
    picture: req.file ? "./uploads/posts/" + fileName : "",
  })
    .then(() => res.status(201).json({ message: "Nouvelle publication !" }))
    .catch((err) => res.status(500).json({ err }));
};

module.exports.getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.status(200).json(posts);
};

module.exports.getOnePost = async (req, res) => {
  User.findOne({
    attributes: ["id", "firstName", "lastName"],
    where: { id: req.body.id },
  }).then((user) => {
    Post.findOne({ where: { id: req.params.id } })
      .then((post) => {
        postData = {
          id: post.id,
          auteur: user.firstName,
        };
        res.status(201).json(postData);
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

module.exports.updatePost = (req, res) => {
  Post.update(
    {
      content: req.body.content,
      isPinned: req.body.isPinned,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then(res.status(201).json(" Publication mise à jour "))
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deletePost = (req, res) => {
  console.log(req.params.id);
  Comment.destroy({
    where: { post: req.params.id },
  })
    .then(() => {
      Like.destroy({
        where: { post: req.params.id },
      });
    })
    .then(() => {
      Post.destroy({
        where: { id: req.params.id },
      });
    })

    .then(res.status(200).json(" Publication supprimé ! "))
    .catch((err) => res.status(500).json({ err }));
};

const uploadErrors = (err) => {
  let errors = { format: null, maxSize: null };
  if (err.message.includes("format")) errors.format = "Format incompatible";
  if (err.message.includes("maxSize"))
    errors.maxSize = "Le fichier ne doit pas excéder 512ko";

  return errors;
};

module.exports.handleFile = (req, res) => {
  try {
    if (req.file.size > 512000) throw Error("maxSize");
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png"
    )
      throw Error("invalid file format");
  } catch (err) {
    console.log("ERROR !!!!!");
    const errors = uploadErrors(err);
    return res.status(200).json({ errors });
  }
};
