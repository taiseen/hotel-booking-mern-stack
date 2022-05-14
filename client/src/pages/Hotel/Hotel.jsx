import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Footer, Header, MailList, Navbar } from './../../components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import data from './../../constants/data';
import './Hotel.scss'


// this <Component /> call from 🟨 App.js 🟨 <Component />
// by the help of React <Router> DOM
const Hotel = () => {

  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  // come with image index (i) number...
  const handleOpen = (i) => {
    // open slider
    setOpen(true);
    // set image index number
    setSlideNumber(i);
  };

  // image direction manipulation...
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "r") {
      newSlideNumber = slideNumber === 5
        ? 0
        : slideNumber + 1;
    } else {
      newSlideNumber = slideNumber === 0
        ? 5
        : slideNumber - 1;
    }
    setSlideNumber(newSlideNumber)
  };



  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="hotelContainer">
        {
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

            <div className="sliderWrapper">
              <img src={data.photos[slideNumber].src} alt="" className="sliderImg" />
            </div>

            <FontAwesomeIcon
              className="right_arrow"
              icon={faCircleArrowRight}
              onClick={() => handleMove("r")}
            />
          </div>
        }

        <div className="hotelWrapper">

          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Tower Street Apartments</h1>

          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New york</span>
          </div>

          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>

          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>

          <div className="hotelImages">
            {
              data.photos.map((photo, i) => (
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
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>

            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>

          </div>

        </div>

        <MailList />
        <Footer />

      </div>
    </div>
  );
};

export default Hotel;