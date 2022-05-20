const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/auth.model");
require("mysql2");
require("body-parser");

exports.signup = (req, res, next) => {
  console.log(req.body);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
(async () => {
  await sequelize.sync();
  const jane = await User.create({
    email: "janedoe",
    password: "azerty",
  });
  console.log(jane.toJSON());
})();
*/
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
      console.log(error);
    })
    .catch((error) => res.status(501).json({ error }));
  console.log(error);
};

/*
exports.signup = (req, res, next) => {
  console.log(req.body);
  console.log(db.user);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.User.create({
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
};*/
