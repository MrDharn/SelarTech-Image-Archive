const express = require('express')
const userProfileRouter = express.Router(); 
const jwtMiddleware = require('../middlewares/JWT_middleware')
const userProfileController = require('../controllers/auth-profile')   

userProfileRouter.route('/profile').get(jwtMiddleware, userProfileController)

module.exports = userProfileRouter  