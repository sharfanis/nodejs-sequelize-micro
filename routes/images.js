const express = require('express');

const imageController = require('../controllers/image.controller');
const imageUploader = require('../helpers/image-uploader');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();


router.post("/imageUpload", checkAuthMiddleware.checkAuth ,imageUploader.upload.single('image') ,imageController.upload);

module.exports = router;