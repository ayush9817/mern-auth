import express from 'express';
import { signUp } from '../controllers/AuthController.js';
const arouter = express.Router();


arouter.post("/signup",signUp)

export default arouter;