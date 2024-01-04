import user from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


export const test = (req,res) =>{
    res.json({
        message:"api is working"
    })
}

export const updateUser = async (req,res)=>{
    console.log(req.user,"req ");
    console.log(req.user.id,"req id");
    console.log(req.params.id,"params id");

   if(req.user.id !== req.params.id){
    return res.status(401).json({message:"you can update only your account"})
   }
   try{
       if(req.body.password){
         req.body.password = bcryptjs.hashSync(req.body.password,10);
       }
       const updateUser = await user.findByIdAndUpdate(req.params.id,{ $set:{
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        profilePicture : req.body.profilePicture
       }},
       { new: true }
       )
       const {password,...rest} = updateUser._doc
       res.status(200).json(rest);
   }
   catch(err){
       console.log(err);
   }
}

export const deleteUser = async (req,res) =>{
    if(req.user.id !== req.params.id){
        return res.status(401).json({message:"you can update only your account"})
    }
    try{
       await user.findByIdAndDelete({_id:req.params.id});
       res.status(200).json({message: "user deleted"});
    }
    catch(error){
        console.log(error); 
    }

}