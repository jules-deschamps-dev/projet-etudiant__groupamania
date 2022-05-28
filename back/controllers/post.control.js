const Post = require("../models/post.model");
const User = require("../models/auth.model");
const db = require("../config/db.config");

exports.newPost = (req, res) => {
  User.findOne({
    attributes: ["id", "firstName", "lastName"],
    where: { id: req.body.author },
  }).then((user) => {
    Post.create({
      title: req.body.title,
      content: req.body.content,
      author: user.id,
    })
      .then(() => res.status(201).json({ message: "Nouvelle publication !" }))
      .catch((err) => res.status(500).json({ err }));
  });
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
    Post.findOne({ where: { id: req.body.id } })
      .then((post) => {
        postData = {
          id: post.id,
          title: post.title,
          auteur: user.firstName,
        };
        res.status(201).json(postData);
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

module.exports.updatePost = async (req, res) => {
  await Post.update(
    {
      content: req.body.content,
    },
    { where: { id: req.body.id } }
  )
    .then(res.status(201).json(" Publication mise à jour "))
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deletePost = async (req, res) => {
  await Post.destroy({
    where: { id: req.body.id },
  })
    .then(res.status(200).json(" Publication supprimé ! "))
    .catch((err) => res.status(500).json({ err }));
};
