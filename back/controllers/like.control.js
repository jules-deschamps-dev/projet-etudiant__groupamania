const Post = require("../models/post.model");
const User = require("../models/auth.model");
const Like = require("../models/like.model");

exports.newLike = async (req, res) => {
  Post.findOne({
    attributes: ["id", "title"],
    where: { id: req.body.node },
  })
    .then((post) => {
      postData = {
        title: post.title,
        id: post.id,
      };
    })
    .catch((err) =>
      res.status(500).json({ err, message: " Publication inexistante " })
    )
    .then(() => {
      Like.create({
        post: postData.id,
        value: req.body.value,
        user: req.body.user,
      });
    })
    .then(() => res.status(201).json({ message: "Nouveau like !" }))
    .catch((err) =>
      res
        .status(500)
        .json({ err, message: " Impossible de publier le commentaire" })
    );
};

module.exports.getLikesByPost = async (req, res) => {
  Like.findAll({
    where: { post: req.body.node },
  }).then((like) => res.status(200).json(like));
};