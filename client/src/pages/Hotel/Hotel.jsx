import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Booking, Footer, Header, MailList, Navbar } from './../../components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchContext } from '../../context/SearchContext';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { singleHotel } from "../../constants/dataFetch";
import { Circles } from 'react-loader-spinner';
import { useState } from "react";
import demoData from './../../constants/demoData';
import './Hotel.scss'



// this <Component /> call from 🟨 App.js 🟨 <Component />
// by the help of React <Router> DOM
const Hotel = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuthContext();
  const { data, loading } = singleHotel(id);
  const { dates, options } = useSearchContext();

  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [bookingModal, setBookingModal] = useState(false);


  // date subtraction calculation
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);




  // come with image index (i) number...
  const handleOpen = (i) => {
    // open slider
    setOpen(true);
    // set image index number
    setSlideNumber(i);
  };

  // image direction manipulation... 
  // Right-to-Left || Left-to-Right
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "r") {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    } else {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    setSlideNumber(newSlideNumber)
  };



  // if user not login send him at Login page... 
  const handleBooking = () => {
    if (user) {
      setBookingModal(true);
    } else {
      navigate('/login');
    }
  }



  return (
    <div>

      <Navbar />
      <Header type="list" />

      <div className="hotelContainer">
        {
          loading
            ? <Circles color="#003580" />
            : data &&
            <div className="hotelWrapper">

              <button className="bookNow" onClick={handleBooking}>Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>

              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>

              <span className="hotelDistance">
                Excellent location – {data.distance}m from center
              </span>

              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
              </span>


              <div className="hotelImages">
                {
                  // 🟨🟨🟨 UI For ==> display all photos...
                  demoData?.photos?.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        alt="hotelPhotos"
                        src={photo.src}
                        className="hotelImg"
                        onClick={() => handleOpen(i)}
                      />
                    </div>
                  ))
                }
              </div>


              <div className="hotelDetails">

                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>

                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days + 1}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${(days + 1) * data.cheapestPrice * options.room}</b> ({days + 1} nights)
                  </h2>
                  <button onClick={handleBooking}>Reserve or Book Now!</button>
                </div>

              </div>
            </div>
        }


        {
          // 🟨🟨🟨 UI for ==> Image Slider 
          open &&
          <div className="slider">

            <FontAwesomeIcon
              className="close"
              icon={faCircleXmark}
              onClick={() => setOpen(false)}
            />

            <FontAwesomeIcon
              className="left_arrow"
              icon={faCircleArrowLeft}
              onClick={() => handleMove("l")}
            />

            {/* 🟨🟨🟨 UI For ==> display for single photo... */}
            <div className="sliderWrapper">
              <img
                alt="single img"
                className="sliderImg"
                src={demoData?.photos[slideNumber].src}
              />
            </div>

            <FontAwesomeIcon
              className="right_arrow"
              icon={faCircleArrowRight}
              onClick={() => handleMove("r")}
            />
          </div>
        }


        {
          // 🟨🟨🟨 UI for ==> Hotel Booking Modal...
          bookingModal && <Booking setBookingModal={setBookingModal} hotelID={id} />
        }

        <MailList />
        <Footer />

      </div>
    </div>
  );
};

export default Hotel;