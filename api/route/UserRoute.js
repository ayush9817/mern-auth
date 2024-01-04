import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/UserController.js';
import { verifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

router.get("/",test);
router.post("/update/:id",verifyToken,updateUser);
router.post("/delete/:id",verifyToken,deleteUser);


export default router;