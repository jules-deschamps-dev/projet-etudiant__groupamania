const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.control");

router.get("/", likeCtrl.getAllLikes);
router.post("/like", likeCtrl.newLike); // C
router.get("/:postId", likeCtrl.getLikesByPost); // R
//router.put("/:id", postCtrl.updateLike); // U

module.exports = router;
