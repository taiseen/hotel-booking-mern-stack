import { getUser, getAllUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import express from "express";

const router = express('router');


router.get('/', verifyAdmin, getAllUser);
router.get('/:id', verifyUser, getUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);


export default router;