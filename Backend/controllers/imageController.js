const cloudinary = require('../config/cloudinary')
const imageModel = require('../models/imageSchema')

const uploadImage = async(req, res)=> {
    try{
        const{title} = req.body;

        // console.log(req.file)
        // console.log(req.file.path)
        // console.log(req.file.filename)
        // console.log(req.userInfo.id)

        if(!req.file){
            return res.status(400).json({
                status: "failed",
                message: "Nothing is being uploadede"
            })
        }

        const newImage = new imageModel({
            title,
            imageUrl: req.file.path,
            publicId: req.file.filename,
            uploadedBy: req.userInfo.id
        })

        await newImage.save();            
        res.status(200).json({
            status: "success",
            message: "image uploaded successfully",
            data: newImage
        })
        

    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

//GET ALL IMAGES CONTROLLER

const getAllImages = async(req, res)=>{
    try{
        const images = await imageModel.find().populate('uploadedBy', 'username email');
        if(images.length === 0) return res.status(404).json({
            status: "Failed",
            message: "Not found"
        })

        res.status(200).json({
            status: "success",
            message: "Fetched successfully",
            count: images.length,
            data: images
        })

    }catch(e){
        console.error(e)
       return res.status(500).json({message: "Internal Server Error"})
    }
}

//TO DELETE IMAGE

const deleteImage = async(req, res)=>{

    try{
        const idOfImageToDelete = req.params.id;
        const userId = req.userInfo.id
        const image = await imageModel.findById(idOfImageToDelete);
        if(!image) return res.status(404).json({
            status: "failed",
            message: "Image can not be found"
        })
        
        //ensure the admin that want to delete is the uploader
        if(image.uploadedBy.toString() !== userId) return res.status(400).json({
            status: "Failed",
            message: "YOu are not Authorized"
        })

        //Delete from cloudinary
        await cloudinary.uploader.destroy(
            image.publicId
        )

        //DELETE FROM DATABASE
        await imageModel.findByIdAndDelete(id)

        res.status(200).json({
            status: "success",
            message:"Image deleted successfully"
        })

    }catch(e){
        console.error(e);
        res.status(500).json({
            message: "Internal Server Error"
        })  
    }
}

module.exports = {uploadImage, getAllImages, deleteImage}