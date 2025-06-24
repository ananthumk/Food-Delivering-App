import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login User 
export const loginUser = async(req, res) => {
   try {
       const { email, password } = req.body;
       
       if(!email || !password) {
           return res.status(400).json({success: false, message: 'Email and password are required'})
       }

       const findUser = await userModel.findOne({email})
       
       if(!findUser){
          return res.status(400).json({success: false,message: 'User not found'})
       }

       const isMatch = await bcrypt.compare(password, findUser.password);
       
       if(!isMatch){
            return res.status(400).json({success: false,message: 'Invalid Password'})
       }

       const token = createToken(findUser._id)
       return res.status(200).json({success: true, token})
   } catch(error) {
       console.log("Login error:", error)
       return res.status(500).json({success: false, message: 'Internal server error'})
   }
}

//Create Token 
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//Register user 
export const registerUser = async(req, res) => {
   const {name, email, password} = req.body;

   const userExists = await userModel.findOne({email})
   if(userExists){
      return res.status(400).json({success: false,message: 'User already exists'})
   }

   if(!validator.isEmail(email)){
       return res.status(400).json({success: false,message: 'Invalid email'})
   }
   if(!validator.isStrongPassword(password)){
         return res.status(400).json({success: false,message: 'Enter a strong password'})
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt); 

   const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
   })

   const user = await newUser.save()

   const token = createToken(user._id) 
   return res.status(200).json({success: true, token})
}