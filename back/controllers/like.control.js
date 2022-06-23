const Post = require("../models/post.model");
const User = require("../models/auth.model");
const Like = require("../models/like.model");

exports.newLike = async (req, res) => {
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
      Like.create({
        post: postData.id,
        user: req.body.user,
      });
    })
    .then(() => res.status(201).json({ message: "Nouveau like !" }))
    .catch((err) =>
      res.status(500).json({ err, message: " Impossible de liker" })
    );
};

module.exports.getAllLikes = async (req, res) => {
  const users = await Like.findAll();
  res.status(200).json(users);
};

module.exports.getLikesByPost = async (req, res) => {
  Like.findAll({
    where: { post: req.params.post },
  }).then((likes) => res.status(200).json(likes));
};

module.exports.unlike = (req, res) => {
  Like.destroy({
    where: { id: req.params.unlike },
  })
    .then(res.status(200).json(" Post was unliked succesfully ! "))
    .catch((err) => console.log(err));
};
