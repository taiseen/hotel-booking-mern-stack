import dbConnection from './db/dbConnection.js';
import hotelRoute from './routers/hotels.js';
import usersRoute from './routers/users.js';
import roomsRoute from './routers/rooms.js';
import authRoute from './routers/auth.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


// instance of express micro-framework.
const app = express();


// middle-wares used by express...
// can abel to reach (req,res) before sending to the user...
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/fav.ico', express.static('public/fav.ico'));


// http:localhost:3000/auth
// http:localhost:3000/hotels
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);


// MiddleWares || for common, Details Error Message...
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
const showInfo = (req, res) => {
    res.send(` 
    <head>
        <title>Server is running... ✅</title> 
        <link rel="icon" href="/fav.ico">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

            body {
                text-align            : center;
                background-image      : url('server.gif');
                background-color      : #eee;
                background-repeat     : no-repeat;
                background-attachment : fixed;
                background-position   : center;
            }

            h1{
                width           : max-content;
                margin          : 50px auto 00px; 
                padding         : 20px 30px 24px;
                font-family     : 'Nunito', sans-serif;
                font-size       : 42px;
                color           : #111;
                border          : 1px solid black;
                border-radius   : 3px;
            }
            img{
                width  : 850px;
                height : 850px;
            }
        </style>
    </head>

    <body>
        <h1> Hotel Booking - Server is running... ✅ </h1>
    </body>
    `);
    // <img src='server.png'/>
}
app.get('/', showInfo);