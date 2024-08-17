const express = require('express');

const userController = require('../controllers/user.controller');



const router = express.Router();
// USER SIGNUP
router.post("/signUp", userController.signUp);
router.post("/login",  userController.login);



module.exports = router;