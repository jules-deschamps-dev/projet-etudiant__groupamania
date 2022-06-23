const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.control");

router.get("/", likeCtrl.getAllLikes);
router.post("/:like", likeCtrl.newLike);
router.get("/:post", likeCtrl.getLikesByPost);
router.delete("/:unlike", likeCtrl.unlike);

module.exports = router;
