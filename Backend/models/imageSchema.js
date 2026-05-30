const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    publicId:{
        type: String,
        required: true
    }
}, {timestamps: true})

const imageModel = mongoose.model('SelarTech_Archives', imageSchema);
module.exports = imageModel