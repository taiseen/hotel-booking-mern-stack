import Hotels from "../models/Hotels.js"
import Rooms from "../models/Rooms.js";


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

    const { min, max, city, ...others } = req.query;

    try {
        const allHotel = await Hotels
            .find({ ...others, cheapestPrice: { $gte: min || 99, $lte: max || 999 } })
            .limit(req.query.limit);

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




export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(',');

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotels.countDocuments({ city: city });
            // return Hotels.find({ city: city }).length 
            // this going to be expensive operation...
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}




export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotels.countDocuments({ type: { $regex: /hotel/i } });
        const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
        const resortCount = await Hotels.countDocuments({ type: "resort" });
        const villaCount = await Hotels.countDocuments({ type: "villa" });
        const cabinCount = await Hotels.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
};




export const getHotelRooms = async (req, res, next) => {

    const { id } = req.params;

    try {
        // 1st) 🟩 Find Hotel...
        const hotel = await Hotels.findById(id);

        // 2nd) 🟩 Find Rooms in that Hotel... || for multiple value, use ==> Promise.all() 
        const list = await Promise.all(
            hotel.rooms.map(room => {
                return Rooms.findById(room);
            })
        );

        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};
