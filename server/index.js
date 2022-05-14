import dbConnection from './db/dbConnection.js';
import hotelRoute from './routers/hotels.js';
import usersRoute from './routers/users.js';
import roomsRoute from './routers/rooms.js';
import authRoute from './routers/auth.js';
import cookieParser from 'cookie-parser';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// middle-wares
app.use(cors());
app.use(cookieParser());
app.use(express.json());


// middle-wares... can abel to reach (req,res) before sending to the user...
// http:localhost:3000/auth
// http:localhost:3000/hotels
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);




// MiddleWares || for common details error message...
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    dbConnection()
    console.log('Server Start on port :', PORT, '🟨');
});


// default welcome message at root/index page...
app.get('/', (req, res) => {
    res.send(`
    <h1 style="
        width:          max-content;
        margin:         50px auto; 
        padding :       20px 30px;
        text-align:     center;
        font-family:    Arial;
        border:         1px solid black;
        border-radius:  3px; 
    ">
    Hotel Booking - Server is running... ✅ <h1>`);
});