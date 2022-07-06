// Create a schema
const passwordValidator = require("password-validator");

var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8

  .is()
  .max(42) // Maximum length 42

  .has()
  .uppercase() // Must have uppercase letters

  .has()
  .lowercase() // Must have lowercase letters

  .has()
  .digits(1) // Must have at least 2 digits

  .has()
  .not()
  .spaces() // Should not have spaces

  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Azerty123"]); // Blacklist these values

module.exports = (req, res, next) => {
  if (schema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error:
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre. Il ne doit pas contenir d'espace",
    });
  }
};
