const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.control");
const userCtrl = require("../controllers/user.control");
const checkUser = require("../middlewares/auth.middleware");
const uploadController = require("../controllers/upload.controller");
const password = require("../middlewares/password.milddleware");

const multer = require("multer");
const upload = multer();
//const password = require("../middleware/password");

// AUTHENTIFICATION
router.post("/register", password, authCtrl.signup); // CREATE
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

// USER
router.get("/", checkUser.requireAuth, userCtrl.getAllUsers); // READ
router.get("/:id", checkUser.requireAuth, userCtrl.getOneUser);
router.put("/:id", checkUser.requireAuth, userCtrl.update); // UPDATE
router.delete("/:id", checkUser.requireAuth, userCtrl.deleteUser); // DELETE
router.post(
  "/upload",
  checkUser.requireAuth,
  upload.single("file"),
  uploadController.uploadProfil
);

module.exports = router;
