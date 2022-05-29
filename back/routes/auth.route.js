const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.control");
const userCtrl = require("../controllers/user.control");
const checkUser = require("../middlewares/auth.middleware");
//const password = require("../middleware/password");

// AUTHENTIFICATION
router.post("/register", authCtrl.signup); // CREATE
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

// USER
router.get("/", userCtrl.getAllUsers); // READ
router.get("/:id", checkUser.checkUser, userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser); // UPDATE
router.delete("/:id", userCtrl.deleteUser); // DELETE

module.exports = router;
