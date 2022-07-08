const User = require("../models/auth.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "picture",
      "departement",
      "isAdmin",
    ],
  });
  res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
  console.log(req.params);
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      userData = {
        name: user.firstName + " " + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        departement: user.departement,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
      };
      res.status(201).json(userData);
    })
    .catch((error) =>
      res.status(500).json({
        error,
        message: "Erreur dans la récupération des données utilisateur",
      })
    );
};

module.exports.update = async (req, res) => {
  User.update(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      departement: req.body.departement,
    },
    { where: { id: req.params.id } }
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
