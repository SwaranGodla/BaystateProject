const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');
//api path for user registration
router.post('/register', ctrlUser.register);

// api for login
router.post('/login', ctrlUser.login);

// api for get all users
router.get('/userInfo', jwtHelper.verifyJwtToken, ctrlUser.userInfo);

module.exports = router;