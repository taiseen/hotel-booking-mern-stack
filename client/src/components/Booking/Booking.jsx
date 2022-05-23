import { roomBooking, showBooking } from '../../constants/dataFetch';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchContext } from '../../context/SearchContext';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './Booking.scss'


// this <Component /> call from 🟨 ../pages/Hotel.js 🟨 <Component />
const Booking = ({ setBookingModal, hotelID }) => {

    const navigate = useNavigate();
    const { dates } = useSearchContext();
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading } = showBooking(hotelID);


    // user selected date & calculate How many days selected...
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };
    const userSelectedDate = getDatesInRange(dates[0].startDate, dates[0].endDate);


    // this function is only use for, 
    // previously booked room are not alow to booking again...
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            userSelectedDate.includes(new Date(date).getTime())
        );
        // isFound ==> is true its meant, we can't get that room for booking
        return isFound;
    };


    // ✅✅ check box click + its value 
    const handleSelect = (e) => {
        const { checked, value } = e.target;

        setSelectedRooms(prev => (
            checked
                ? [...prev, value]
                : prev.filter(item => item !== value)
        ))
    }


    // functionality for ==> Reserve Now! <== Button
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map(roomId => {
                    const { data } = roomBooking(roomId, userSelectedDate);
                    return data; // roomBooking is a PUT request
                })
            );
            setBookingModal(false);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="hotelBooking">

            <div className="container">

                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="modalCloseBtn"
                    onClick={() => setBookingModal(false)}
                />

                <span>Select your rooms: </span>

                {
                    loading
                        ? < Circles color="#003580" className="spinner" />
                        : data?.length > 0
                            ? <>
                                {
                                    data.map((item, i) => (
                                        <div className='item' key={i}>

                                            <div className="itemInfo">
                                                <div className="title">{item.title}</div>
                                                <div className="desc">{item.desc}</div>
                                                <div className="max">
                                                    Max people : <b>{item.maxPeople}</b>
                                                </div>
                                                <div className="price">${item.price}</div>
                                            </div>

                                            <div className="selectRooms">
                                                {
                                                    item.roomNumbers.map(roomNumber => (
                                                        <div className="room" key={roomNumber._id}>
                                                            <label>{roomNumber.number}</label>
                                                            <input
                                                                type="checkbox"
                                                                value={roomNumber._id}
                                                                onChange={handleSelect}
                                                                disabled={isAvailable(roomNumber)}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }

                                <button onClick={handleClick} className="button">
                                    Reserve Now!
                                </button>
                            </>
                            : <div className='noMessage'>
                                <h1>No Room Found!</h1>
                                <h2>Please check another hotel...</h2>
                            </div>
                }
            </div>
        </div>
    )
}

export default Booking