require('dotenv').config();
const userModel = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSignUp = async(req, res)=>{
    try{
        const {username, email, password, role} = req.body;

        //Check if user already in my database
        const isUserExisting = await userModel.findOne({email});
        if(isUserExisting) return res.status(401).json({
            status: "failed",
            message: "Email is already Existing!!"
        })

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user now and add to the database

        const newUser = new userModel({
            username,
            password: hashedPassword,
            email, 
            role
        })

        await newUser.save();

       return res.status(201).json({
            status: "success",
            message: "User created successfully",
            newUser
        })

    }catch(e){
        console.error(e)
        res.status(500).json({
        message: "Internal server error",
       })
    }

}

const userLogin = async(req, res)=> {
    try{
        const{email, password, role} = req.body;
        if(!email || !password) return res.status(400).json({
            status: "failed",
            message: "Cannot be empty"
        })
        
        //check if the email is not in database
        const isEmailExisting = await userModel.findOne({email});
        if(!isEmailExisting) return res.status(400).json({
            status:'failure',
            message: 'Invalid email'
        })

        //compare password 
        const isPassword = await bcrypt.compare(password, isEmailExisting.password);
        if(!isPassword) return res.status(400).json({
            status: "failed",
            message: "Password is incorrect !"
        })

        //create a token
        const createToken = jwt.sign({
            email: isEmailExisting.email,
            role: isEmailExisting.role,
            id: isEmailExisting._id
        }, JWT_SECRET_KEY, {expiresIn: '60m'})
        if(!createToken) return res.status(400).json({message: "Cannot create Token"});

        res.status(200).json({
            status: "Success",
            message: "Login ",
            createToken
        })

    }catch(e){
         res.status(500).json({
            status: "failed",
            message: e.message
        });
    }
}

module.exports = {userSignUp, userLogin}