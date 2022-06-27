// Include Sequelize module.
const Sequelize = require("sequelize");
const db = require("../config/db.config");
const { isEmail, len } = require("validator");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 6,
    },
  },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  picture: {
    type: Sequelize.STRING,
    defaultValue: "./uploads/profil/user.png",
  },
  bio: { type: Sequelize.TEXT, defaultValue: "" },
  //isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = User;
