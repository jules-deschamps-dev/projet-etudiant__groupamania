const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.control");
const multer = require("multer");
const upload = multer();

router.get("/", postCtrl.getAllPosts);
router.post("/create", upload.single("file"), postCtrl.newPost); // C
router.get("/:id", postCtrl.getOnePost); // R
router.put("/:id", postCtrl.updatePost); // U
router.delete("/:id", postCtrl.deletePost); // D
router.post("/upload", upload.single("file"), postCtrl.handleFile); // C

module.exports = router;
