// import {  } from "../controllers/room.js";
import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express('router');


router.post('/:hotelID', verifyAdmin, createRoom);

router.get('/:id', getRoom);
router.get('/', getAllRoom);

router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);

router.delete('/:roomID/:hotelID', verifyAdmin, deleteRoom);


export default router;