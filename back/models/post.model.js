const Sequilize = require("sequelize");
const db = require("../config/db.config");

const Post = db.define("posts", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  content: { type: Sequilize.TEXT, allowNull: false },
  picture: { type: Sequilize.TEXT, allowNull: false },
  author: { type: Sequilize.INTEGER, defaultValue: 0 },
  isPinned: { type: Sequilize.BOOLEAN, defaultValue: false },
  createdAt: Sequilize.DATE,
  updatedAt: Sequilize.DATE,
});

module.exports = Post;
