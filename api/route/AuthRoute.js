import express from 'express';
import { google, signIn, signOut, signUp } from '../controllers/AuthController.js';
const arouter = express.Router();


arouter.post("/signup",signUp);
arouter.post("/signin",signIn);
arouter.post("/google",google);
arouter.get("/signout",signOut);

export default arouter;