const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth.control");
//const password = require("../middleware/password");

router.post("/register", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
