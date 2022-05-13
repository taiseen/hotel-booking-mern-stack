import "react-date-range/dist/styles.css"; // main css file | this file must br top of "theme css file".
import "react-date-range/dist/theme/default.css"; // theme css file | for hover color + soft animation.
import { useLocation } from 'react-router-dom';
import { Navbar, Header, SearchItem } from '../../components';
import { format, min } from 'date-fns';
import { useState } from 'react';
import './HotelList.scss'
import { DateRange } from 'react-date-range';


// this <Component /> call from 🟨 App.js 🟨 <Component />
// by the help of React <Router> DOM
const HotelList = () => {

  const location = useLocation();
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(location?.state?.date);
  const [options, setOptions] = useState(location?.state?.options);
  const [destination, setDestination] = useState(location?.state?.destination);

  const handlePrice = (e) => {

    const { value, id } = e.target;

    if (id === 'min') {
      // if (minPrice >= 100) {
        setMinPrice(value)
      // } else {
      //   setMinPrice(100)
      // }
    } else {
      setMaxPrice(value)
    }

  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="hotelListContainer">
        <div className="wrapper">

          <div className="search">
            <h1 className="title">Search</h1>

            <div className="item">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} className='destination' />
            </div>

            <div className="item">
              <label htmlFor="">Check-in-Date</label>
              <span className="displayDate" onClick={() => setOpenDate(!openDate)}>
                {`
                  ${format(date[0].startDate, 'dd-MMM-yyyy')} to 
                  ${format(date[0].endDate, 'dd-MMM-yyyy')}  
                `}
              </span>
              {
                // 🟨🟨🟨 UI for ==> Date Picking...
                // by user click, its toggling as open/close... 
                openDate &&
                <DateRange
                  ranges={date}
                  minDate={new Date()}
                  onChange={item => setDate([item.selection])}
                />
              }
            </div>

            <div className="item">
              <label htmlFor="">Options</label>

              <div className="options">

                <div className="optionItem">
                  <span className="optionText">Min price <small>per night</small> </span>
                  <span className="price">
                    <input type="number" placeholder="100" className="optionInput" value={minPrice} id='min' onChange={handlePrice} />
                  </span>
                </div>

                <div className="optionItem">
                  <span className="optionText">Max price <small>per night</small> </span>
                  <span className="price">
                    <input type="number" placeholder="1000" className="optionInput" value={maxPrice} id='max' onChange={handlePrice} />
                  </span>
                </div>

                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <input
                    min={1}
                    type="number"
                    className="optionInput"
                    placeholder={options.adult}
                    value={options.adult}
                  />
                </div>

                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <input
                    min={0}
                    type="number"
                    className="optionInput"
                    placeholder={options.children}
                    value={options.children}
                  />
                </div>

                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <input
                    min={1}
                    type="number"
                    className="optionInput"
                    placeholder={options.room}
                    value={options.room}
                  />
                </div>

              </div>

            </div>

            <button
              className="listSearchBtn"

            >
              Search
            </button>

          </div>

          <div className="searchResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />

          </div>

        </div>
      </div>
    </div>
  )
}

export default HotelList