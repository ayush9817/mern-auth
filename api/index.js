import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import urouter from './route/UserRoute.js';
import arouter from './route/AuthRoute.js';


dotenv.config();




const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    console.log("server listening on port 3000")
})  

app.use(express.json());


app.use("/api/user",urouter)
app.use("/api/auth",arouter)