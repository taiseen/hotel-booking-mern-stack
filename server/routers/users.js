import { getUser, getAllUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import express from "express";

const router = express('router');


router.get('/',  getAllUser); //verifyAdmin,
router.get('/:id',  getUser); // verifyUser,
router.put('/:id',  updateUser); // verifyUser,
router.delete('/:id',  deleteUser); // verifyUser,


export default router;