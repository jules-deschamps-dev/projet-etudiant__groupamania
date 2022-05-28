const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.control");

//router.get("/", postCtrl.getAllLike);
router.post("/like", likeCtrl.newLike); // C
router.get("/:id", likeCtrl.getLikesByPost); // R
//router.put("/:id", postCtrl.updateLike); // U

module.exports = router;
