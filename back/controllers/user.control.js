const User = require("../models/auth.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
  User.findOne({ where: { id: req.body.id } }) //recherche le champ id dans user où il est égal à la valeur de la req
    .then((user) => {
      userData = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        id: user.id,
      };
      res.status(201).json(userData);
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.updateUser = async (req, res) => {
  await User.update(
    {
      email: req.body.email,
    },
    { where: { id: req.body.id } }
  )
    .then(res.status(201).json(" Profil mis à jour avec succès "))
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deleteUser = async (req, res) => {
  await User.destroy({
    where: { id: req.body.id },
  })
    .then(res.status(200).json(" Utilisateur supprimé ! "))
    .catch((err) => res.status(500).json({ err }));
};
