import Users from "../models/Users.js"


export const getUser = async (req, res, next) => {

    const { id } = req.params;

    try {
        const user = await Users.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


export const getAllUser = async (req, res, next) => {

    try {
        const allUser = await Users.find();
        res.status(200).json(allUser);
    } catch (error) {
        next(error);
    }
}


export const updateUser = async (req, res, next) => {

    const user = req.body;
    const { id } = req.params;

    try {
        const updateUser = await Users.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
    // findByIdAndUpdate() ==> return previous document 
    // so for returning new document, 
    // pass this object as a parameter ==> { new: true }
}


export const deleteUser = async (req, res, next) => {

    const { id } = req.params;

    try {
        await Users.findByIdAndDelete(id);
        res.status(200).json("User has been deleted successfully...");
    } catch (error) {
        next(error);
    }
}