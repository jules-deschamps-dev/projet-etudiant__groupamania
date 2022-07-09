const Sequilize = require("sequelize");
const db = require("../config/db.config");

const Comment = db.define("comments", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  content: { type: Sequilize.TEXT, allowNull: false },
  author: { type: Sequilize.INTEGER, defaultValue: 0 },
  post: { type: Sequilize.INTEGER, defaultValue: 0 },
  createdAt: Sequilize.DATE,
  updatedAt: Sequilize.DATE,
});

module.exports = Comment;
