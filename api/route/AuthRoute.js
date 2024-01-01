import express from 'express';
import { google, signIn, signUp } from '../controllers/AuthController.js';
const arouter = express.Router();


arouter.post("/signup",signUp)
arouter.post("/signin",signIn)
arouter.post("/google",google)

export default arouter;