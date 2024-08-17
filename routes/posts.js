const express = require('express');

const postController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.get("/", checkAuthMiddleware.checkAuth, postController.index);
router.post("/save", checkAuthMiddleware.checkAuth,postController.save);
router.get("/getPostById/:id",checkAuthMiddleware.checkAuth,postController.showPostById);
router.get("/getAllPosts",checkAuthMiddleware.checkAuth,postController.getAllPosts);
router.post("/updatePost/:id",checkAuthMiddleware.checkAuth,postController.updatePost);
router.delete("/deletePost/:id",checkAuthMiddleware.checkAuth, postController.deletePost);

module.exports = router;