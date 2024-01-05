import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import urouter from './route/UserRoute.js';
import arouter from './route/AuthRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();





const app = express();

const __dirname = path.resolve();
console.log(__dirname,"path");



app.use(express.static(path.join(__dirname, '/client/dist')));

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    console.log("server listening on port 3000")
})  

app.use(express.json());
app.use(cookieParser());


app.use("/api/user",urouter)
app.use("/api/auth",arouter)