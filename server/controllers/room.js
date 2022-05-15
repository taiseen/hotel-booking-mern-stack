import Rooms from '../models/Rooms.js';
import Hotels from '../models/Hotels.js';
import { createError } from './../utils/error.js';


export const createRoom = async (req, res, next) => {

    const { hotelID } = req.params;
    const newRoom = new Rooms(req.body);

    try {
        const saveRoom = await newRoom.save();

        try {
            await Hotels.findByIdAndUpdate(hotelID, { $push: { rooms: saveRoom._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json(saveRoom);
    } catch (error) {
        next(error)
    }
}



export const getRoom = async (req, res, next) => {

    const { id } = req.params;

    try {
        const room = await Rooms.findById(id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}



export const getAllRoom = async (req, res, next) => {

    try {
        const allRoom = await Rooms.find();
        res.status(200).json(allRoom);
    } catch (error) {
        next(error);
    }
}



export const updateRoom = async (req, res, next) => {

    const room = req.body;
    const { id } = req.params;

    try {
        const updateRoom = await Rooms.findByIdAndUpdate(id, room, { new: true });
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
    // findByIdAndUpdate() ==> return previous document 
    // so for returning new document, 
    // pass this object as a parameter ==> { new: true }
}


export const updateRoomAvailability = async (req, res, next) => {

    const { dates } = req.body;
    const { id } = req.params;
    
    try {
        await Rooms.updateOne(
            { "roomNumbers._id": id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (error) {
        next(error);
    }
    // findByIdAndUpdate() ==> return previous document 
    // so for returning new document, 
    // pass this object as a parameter ==> { new: true }
}



export const deleteRoom = async (req, res, next) => {

    const { roomID, hotelID } = req.params;

    try {
        await Rooms.findByIdAndDelete(roomID);

        try {
            await Hotels.findByIdAndUpdate(hotelID, { $pull: { rooms: roomID } })
        } catch (error) {
            next(error)
        }

        res.status(200).json("Room has been deleted successfully...");
    } catch (error) {
        next(error);
    }
}