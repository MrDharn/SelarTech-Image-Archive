const express = require('express');
const imageRouter =  express.Router();
const jwtMiddleware = require('../middlewares/JWT_middleware')
const adminMiddleware = require('../middlewares/admin_middleware')
const upload = require('../middlewares/imageMiddleware')
const{getAllImages, deleteImage, uploadImage} = require('../controllers/imageController');

imageRouter.route('/archive/upload').post(jwtMiddleware, adminMiddleware, upload.single('image'), uploadImage);
imageRouter.route('/archive/:id').delete(jwtMiddleware, adminMiddleware, deleteImage);
imageRouter.route('/archive').get(jwtMiddleware, getAllImages);

module.exports = imageRouter