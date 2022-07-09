const Post = require("../models/post.model");
const User = require("../models/auth.model");
const Comment = require("../models/comment.model");
const db = require("../config/db.config");

exports.newComment = async (req, res) => {
  Post.findOne({
    attributes: ["id"],
    where: { id: req.body.post },
  })
    .then((post) => {
      postData = {
        id: post.id,
      };
    })
    .catch((err) =>
      res.status(500).json({ err, message: " Publication inexistante " })
    )
    .then(() => {
      Comment.create({
        post: postData.id,
        author: req.body.author,
        content: req.body.content,
      });
    })
    .then(() => res.status(201).json({ message: "Nouveau commentaire !" }))
    .catch((err) =>
      res.status(500).json({ err, message: " Impossible de commenter" })
    );
};

module.exports.getAllComments = async (req, res) => {
  const comments = await Comment.findAll();
  res.status(200).json(comments);
};

module.exports.getCommentsByPost = async (req, res) => {
  Comment.findAll({
    where: { parentPost: req.body.node },
  }).then((comments) => res.status(200).json(comments));
};

module.exports.updateComment = (req, res) => {
  Comment.update(
    {
      content: req.body.content,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then(res.status(201).json(" Commentaire mise à jour "))
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deleteComment = (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then(res.status(200).json(" Commentaire supprimé ! "))
    .catch((err) => res.status(500).json({ err }));
};
