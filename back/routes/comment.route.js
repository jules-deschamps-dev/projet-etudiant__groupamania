const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/comment.control");

router.get("/", postCtrl.getAllComments);
router.post("/create", postCtrl.newComment); // C
router.get("/:id", postCtrl.getCommentsByPost); // R
//router.put("/:id", postCtrl.updatePost); // U
router.delete("/:id", postCtrl.deleteComment); // D

module.exports = router;
