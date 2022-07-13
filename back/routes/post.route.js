const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.control");
const multer = require("multer");
const upload = multer();
const checkUser = require("../middlewares/auth.middleware");

router.get("/", checkUser.requireAuth, postCtrl.getAllPosts);
router.post(
  "/create",
  checkUser.checkUser,
  upload.single("file"),
  postCtrl.newPost
); // C
router.get("/:id", checkUser.requireAuth, postCtrl.getOnePost); // R
router.put("/:id", checkUser.requireAuth, postCtrl.updatePost); // U
router.delete("/:id", checkUser.checkUser, postCtrl.deletePost); // D
router.post(
  "/upload",
  checkUser.requireAuth,
  upload.single("file"),
  postCtrl.handleFile
); // C

module.exports = router;
