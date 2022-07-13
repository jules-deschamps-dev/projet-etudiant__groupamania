const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.control");
const checkUser = require("../middlewares/auth.middleware");

router.get("/", checkUser.checkUser, likeCtrl.getAllLikes);
router.post("/:like", checkUser.checkUser, likeCtrl.newLike);
router.get("/:post", checkUser.checkUser, likeCtrl.getLikesByPost);
router.delete("/:unlike", checkUser.checkUser, likeCtrl.unlike);

module.exports = router;
