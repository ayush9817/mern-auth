import user from "../model/UserModel.js";
import bcryptjs from "bcryptjs";

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