const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookies("token", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findOne({
          where: {
            id: decodedToken.id,
          },
        });
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("non identifié");
    res.locals.user = null;
    res.status(500).json("Vous n'êtes pas identifié");
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        //pas de next car on ne veut pas aller plus loin
      } else {
        console.log("id : " + decodedToken.id);
        next();
      }
    });
  } else {
    res.status(500).json("Aucun token trouvé");
  }
};
