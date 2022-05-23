// import {  } from "../controllers/room.js";
import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express('router');


router.post('/:hotelID',  createRoom); // verifyAdmin,

router.get('/:id', getRoom);
router.get('/', getAllRoom);

router.put('/:id',  updateRoom); // verifyAdmin,
router.put('/availability/:id', updateRoomAvailability);

router.delete('/:roomID/:hotelID',  deleteRoom); // verifyAdmin,


export default router;