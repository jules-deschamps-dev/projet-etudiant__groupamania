const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/comment.control");

const checkUser = require("../middlewares/auth.middleware");

router.get("/", checkUser.requireAuth, postCtrl.getAllComments);
router.post("/create", checkUser.requireAuth, postCtrl.newComment); // C
router.get("/:id", checkUser.requireAuth, postCtrl.getCommentsByPost); // R
router.put("/:id", checkUser.requireAuth, postCtrl.updateComment); // U
router.delete("/:id", checkUser.requireAuth, postCtrl.deleteComment); // D

module.exports = router;
