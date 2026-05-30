const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/admin_middleware')
const jwtMiddleware = require('../middlewares/JWT_middleware')
const express = require('express')
const adminRoute = express.Router()

adminRoute.route('/admin').get(jwtMiddleware, adminMiddleware, adminController)
module.exports = adminRoute