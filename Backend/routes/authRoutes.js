const express = require('express')
const authRouter = express.Router();
const {userSignUp, userLogin} = require('../controllers/authController')

authRouter.route('/signup').post(userSignUp);
authRouter.route('/login').post(userLogin)

module.exports = authRouter