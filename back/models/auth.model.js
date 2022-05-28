// Include Sequelize module.
const Sequelize = require("sequelize");
const db = require("../config/db.config");
const { isEmail } = require("validator");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    //validate: { isEmail },
    allowNull: false,
    unique: true,
  },
  password: { type: Sequelize.STRING, allowNull: false },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  avatar: { type: Sequelize.STRING, defaultValue: `/images/user.svg` },
  bio: { type: Sequelize.TEXT, defaultValue: "" },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = User;
