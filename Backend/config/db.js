const mongoose = require('mongoose')
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected successfully!!")
    }catch(e){
        console.log("Database could not be connected")
        process.exit(1)
    }
}

module.exports = connectDB