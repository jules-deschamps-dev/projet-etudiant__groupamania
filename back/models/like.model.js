const Sequilize = require("sequelize");
const db = require("../config/db.config");

const Like = db.define("likes", {
  user: { type: Sequilize.INTEGER, defaultValue: 0 },
  post: { type: Sequilize.INTEGER, defaultValue: 0 },
  createdAt: Sequilize.DATE,
  updatedAt: Sequilize.DATE,
});

module.exports = Like;
