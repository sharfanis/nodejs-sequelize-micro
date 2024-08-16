const express = require('express');

const postController = require('../controllers/post.controller');

const router = express.Router();

router.get("/", postController.index);
router.post("/save", postController.save);
router.get("/getPostById/:id",postController.showPostById);
router.get("/getAllPosts",postController.getAllPosts);
router.post("/updatePost/:id",postController.updatePost);
router.delete("/deletePost/:id",postController.deletePost);

module.exports = router;