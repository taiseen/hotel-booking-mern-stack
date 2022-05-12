import Hotels from "../models/Hotels.js"


export const addHotel = async (req, res, next) => {

    const newHotelAdd = new Hotels(req.body);

    try {
        const saveHotel = await newHotelAdd.save();
        res.status(200).json(saveHotel);
    } catch (error) {
        next(error);
    }
}


export const getHotel = async (req, res, next) => {

    const { id } = req.params;

    try {
        const hotel = await Hotels.findById(id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}


export const getAllHotel = async (req, res, next) => {

    try {
        const allHotel = await Hotels.find();
        res.status(200).json(allHotel);
    } catch (error) {
        next(error);
    }
}


export const updateHotel = async (req, res, next) => {

    const hotel = req.body;
    const { id } = req.params;

    try {
        const updateHotel = await Hotels.findByIdAndUpdate(id, hotel, { new: true });
        res.status(200).json(updateHotel);
    } catch (error) {
        next(error);
    }
    // findByIdAndUpdate() ==> return previous document 
    // so for returning new document, 
    // pass this object as a parameter ==> { new: true }
}


export const deleteHotel = async (req, res, next) => {

    const { id } = req.params;

    try {
        await Hotels.findByIdAndDelete(id);
        res.status(200).json("Hotel has been deleted successfully...");
    } catch (error) {
        next(error);
    }
}