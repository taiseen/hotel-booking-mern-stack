import { createError } from './../utils/error.js';
import Users from '../models/Users.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// user registration 
export const sign_up = async (req, res, next) => {

    const email = req.body.email

    try {
        // 1st) 🟩 find the user if the user already exits in database
        const user = await Users.findOne({ email });
        if (user) return next(createError(500, "User already exist..."));

        // 2nd) 🟩 user plain password, hashing mechanism...
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        // 3rd) 🟩 collect user info from Frontend & 
        // create a user {Object} upon this info...
        const newUser = new Users({
            // userName: req.body.userName,
            // email: req.body.email,
            ...req.body,
            password: hash,
        });

        // 4th) 🟩 data save into database
        await newUser.save();
        res.status(200).send("User has been created successfully...")

    } catch (error) {
        next(error)
    }
}

// user login
export const sign_in = async (req, res, next) => {

    const email = req.body.email
    const pass = req.body.password

    try {
        // 1st) 🟩 check that user email is exist of not...
        const user = await Users.findOne({ email });
        if (!user) return next(createError(404, "No user found..."));

        // 2nd) 🟩 check that user password with saved password that save into DB...
        const isPassCorrect = await bcrypt.compare(pass, user.password)
        if (!isPassCorrect) return next(createError(404, "Wrong Password..."));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        // 3rd) 🟩 without {password, isAdmin} property, send all info into frontend...
        const { password, isAdmin, ...otherInfos } = user._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .send({ ...otherInfos });

    } catch (error) {
        next(error)
    }
}