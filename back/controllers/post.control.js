const Post = require("../models/post.model");

exports.newPost = (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(() => res.status(201).json({ message: "Nouveau post !" }))
    .catch((err) => res.status(500).json({ err }));
};

module.exports.getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.status(200).json(posts);
};

module.exports.getOnePost = async (req, res) => {
  Post.findOne({ where: { id: req.body.id } }) //recherche le champ id dans post où il est égal à la valeur de la req
    .then((post) => {
      postData = {
        name: post.firstName + " " + post.lastName,
        email: post.email,
        id: post.id,
      };
      res.status(201).json(postData);
    })
    .catch((error) => res.status(500).json({ error }));
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
    .then(res.status(200).json(" Utilisateur supprimé ! "))
    .catch((err) => res.status(500).json({ err }));
};
