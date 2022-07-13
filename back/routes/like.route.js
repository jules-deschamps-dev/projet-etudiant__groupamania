const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.control");
const checkUser = require("../middlewares/auth.middleware");

router.get("/", checkUser.requireAuth, likeCtrl.getAllLikes);
router.post("/:like", checkUser.requireAuth, likeCtrl.newLike);
router.get("/:post", checkUser.requireAuth, likeCtrl.getLikesByPost);
router.delete("/:unlike", checkUser.requireAuth, likeCtrl.unlike);

module.exports = router;
