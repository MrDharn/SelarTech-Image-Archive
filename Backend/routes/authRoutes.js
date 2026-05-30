const express = require('express')
const authRouter = express.Router();
const {userSignUp, userLogin, changePasswordController} = require('../controllers/authController')
const jwtMiddleware = require('../middlewares/JWT_middleware');

authRouter.route('/signup').post(userSignUp);
authRouter.route('/login').post(userLogin)
authRouter.route('/change-password').post(jwtMiddleware, changePasswordController)

module.exports = authRouter