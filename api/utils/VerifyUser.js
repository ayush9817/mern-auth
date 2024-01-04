import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.acesstoken;
    //console.log("token",token);
    if(!token){
        return res.status(401).json({message:"you need to login"});
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        
        if(err){
            res.status(401).json({message:"auth error"});
        }
        console.log("user",user);
        req.user = user;
        next();
    })
    

}