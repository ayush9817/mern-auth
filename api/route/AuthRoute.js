import express from 'express';
import { signIn, signUp } from '../controllers/AuthController.js';
const arouter = express.Router();


arouter.post("/signup",signUp)
arouter.post("/signin",signIn)

export default arouter;