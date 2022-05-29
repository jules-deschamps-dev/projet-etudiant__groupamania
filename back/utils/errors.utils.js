module.exports.signupError = (err) => {
  let error = { email: "", password: "" };
  if ((err.name = "SequelizeUniqueConstraintError")) {
    error.email = "Cet email est déjà utilisé ou est invalide";
  } else if ((err.name = "SequelizeValidationError")) {
    error.email = "Cet email est invalide ou est déjà utilisé";
  }
  return error;
};
