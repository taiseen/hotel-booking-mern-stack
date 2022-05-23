import {
    addHotel, getHotel, getAllHotel, updateHotel, deleteHotel,
    countByCity, countByType, getHotelRooms
} from "../controllers/hotel.js";
import { verifyAdmin } from './../utils/verifyToken.js';
import express from "express";


const router = express('router');


router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

router.get('/', getAllHotel);
router.get('/:id', getHotel);
router.get('/rooms/:id', getHotelRooms);

router.post('/',  addHotel); // verifyAdmin,
router.put('/:id',  updateHotel); // verifyAdmin,
router.delete('/:id',  deleteHotel); // verifyAdmin,


export default router;