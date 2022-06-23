const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/auth.route");
const db = require("./config/db.config");
const { Sequelize } = require("sequelize");
const postRoutes = require("./routes/post.route");
const likeRoute = require("./routes/like.route");
const commentRoute = require("./routes/comment.route");
require("dotenv").config({ path: "./config/.env" });
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(
  cors({
    origin: [
      `http://localhost:3000`,
      `http://localhost:5000`,
      `http://localhost:3306`,
    ],
    credentials: "true",
  })
);
app.get("*", checkUser);
/*
app.get("*", checkUser, (req, res) => {
  res.status(200).json(res.locals.user);
});
*/
app.get("/token", requireAuth, (req, res) => {
  //res.status(200).json(res.locals.user);
  res.status(200).json(res.locals.user);
});

db.sync();

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
