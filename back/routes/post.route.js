const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.control");

router.get("/", postCtrl.getAllPosts);
router.post("/create", postCtrl.newPost); // C
router.get("/:id", postCtrl.getOnePost); // R
router.put("/:id", postCtrl.updatePost); // U
router.delete("/:id", postCtrl.deletePost); // D

module.exports = router;
