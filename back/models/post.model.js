const Sequilize = require("sequelize");
const db = require("../config/db.config");

const Post = db.define("posts", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: { type: Sequilize.STRING, allowNull: false },
  content: { type: Sequilize.TEXT, allowNull: false },
  createdAt: Sequilize.DATE,
  updatedAt: Sequilize.DATE,
});

module.exports = Post;
