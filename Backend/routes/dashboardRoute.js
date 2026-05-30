const authMiddleware = require('../middlewares/JWT_middleware')
const dashBoardController = require('../controllers/authorization')
const express = require('express')
const dashBoardRoute = express.Router();


//route to the dashboard

dashBoardRoute.route('/dashboard').get(authMiddleware, dashBoardController);

module.exports = dashBoardRoute