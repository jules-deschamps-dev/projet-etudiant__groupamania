const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/comment.control");

const checkUser = require("../middlewares/auth.middleware");

router.get("/", checkUser.checkUser, postCtrl.getAllComments);
router.post("/create", checkUser.checkUser, postCtrl.newComment); // C
router.get("/:id", checkUser.checkUser, postCtrl.getCommentsByPost); // R
router.put("/:id", checkUser.checkUser, postCtrl.updateComment); // U
router.delete("/:id", checkUser.checkUser, postCtrl.deleteComment); // D

module.exports = router;
