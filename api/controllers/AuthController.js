import user from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const signUp = async (req,res)=>{
   const {username,email,password} = req.body;
   const hpassword = bcryptjs.hashSync(password,10);
   const newUser = new user({username,email,password:hpassword});
   try{
    await newUser.save();
    res.status(201).json({message:"User created Successfully"})
   }
   catch(error){
    res.status(500).json(error.message);
   }
   
}

export const signIn = async (req,res)=>{
   const {email,password} = req.body;
   try{
      const valid = await user.findOne({email});
      console.log(valid);
      if(!valid){
         return res.status(500).json({message:"auth error"})
      }
      console.log("hi")
      console.log('password:', password);
console.log('valid.password:', valid.password);
      const validp = bcryptjs.compareSync(password,valid.password);

console.log("hi")
      if(!validp){
         return res.status(500).json({message:"auth error"})
      }
      console.log("env")
      console.log(process.env.JWT,"env")
      console.log("env2")

      const token = jwt.sign({id:valid._id},process.env.JWT);
      const {password:hpassword,...rest} = valid._doc;
      const expiryDate = new Date(Date.now()+3600000);
      res.cookie("acesstoken",token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
   }
   catch(error){
      res.status(500).json(error.message);
   }
}

export const google = async (req,res) =>{
   const {email,name,photo} = req.body;
   try {
      const valid = await user.findOne({email});
      
      if(valid){
      const token = jwt.sign({id:valid._id},process.env.JWT);
      //const token = jwt.sign({id:valid._id},process.env.JWT);
      const {password:hpassword,...rest} = valid._doc;
      const expiryDate = new Date(Date.now()+3600000);
      res.cookie("acesstoken",token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
      }
      else{
        const generatePassword = Math.random().toString(36).slice(-8);
        const hpassword = bcryptjs.hashSync(generatePassword,10);
        const newUser = new user({username:name,email,password:hpassword,profilePicture:photo});

      }
   }
   catch(err){
      console.log(err);
   }
}