import { sign_up, sign_in } from "../controllers/auth.js";
import express from "express";

const router = express('router');


router.post('/sign-up', sign_up);
router.post('/sign-in', sign_in);


export default router;