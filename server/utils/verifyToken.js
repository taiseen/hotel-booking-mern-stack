import { createError } from "./error.js";
import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {

    // this access_token property come from [ auth.js =====> sign_in() ]
    const token = req.cookies.access_token;

    if (!token) { // if no token present...
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};


export const verifyUser = (req, res, next) => {

    verifyToken(req, res, next, () => {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};


export const verifyAdmin = (req, res, next) => {


    verifyToken(req, res, next, () => {

        if (req.user.isAdmin) {
            next();
        } else {
            console.log(req.user.isAdmin);
            return next(createError(403, "You are not authorized!"));
        }
    });
};