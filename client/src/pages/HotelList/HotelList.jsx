import "react-date-range/dist/styles.css"; // main css file | this file must br top of "theme css file".
import "react-date-range/dist/theme/default.css"; // theme css file | for hover color + soft animation.
import { Navbar, Header, SearchItem } from '../../components';
import { useLocation } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useState } from 'react';
import useFetch from './../../constants/useFetch';
import demoData from './../../constants/demoData';
import './HotelList.scss'


// this <Component /> call from 🟨 App.js 🟨 <Component />
// by the help of React <Router> DOM
const HotelList = () => {

  const location = useLocation();
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location?.state?.dates);
  const [options, setOptions] = useState(location?.state?.options);
  const [destination, setDestination] = useState(location?.state?.destination);

  const endPoint = `/hotels?city=${destination}&min=${minPrice || 0}&max=${maxPrice || 999}`;
  const { data, loading, reFetchData } = useFetch(endPoint);

  const handelClick = () => {
    reFetchData(endPoint)
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
                  ${format(dates[0].startDate, 'dd-MMM-yyyy')} to 
                  ${format(dates[0].endDate, 'dd-MMM-yyyy')}  
                `}
              </span>
              {
                // 🟨🟨🟨 UI for ==> Date Picking...
                // by user click, its toggling as open/close... 
                openDate &&
                <DateRange
                  ranges={dates}
                  minDate={new Date()}
                  onChange={item => setDates([item.selection])}
                />
              }
            </div>

            <div className="item">
              <label htmlFor="">Options</label>

              <div className="options">

                <div className="optionItem">
                  <span className="optionText">Min price <small>per night</small> </span>
                  <span className="price">
                    <input
                      type="number"
                      placeholder="100"
                      value={minPrice}
                      className="optionInput"
                      onChange={e => setMinPrice(e.target.value)}
                    />
                  </span>
                </div>

                <div className="optionItem">
                  <span className="optionText">Max price <small>per night</small> </span>
                  <span className="price">
                    <input
                      type="number"
                      placeholder="1000"
                      value={maxPrice}
                      className="optionInput"
                      onChange={e => setMaxPrice(e.target.value)}
                    />
                  </span>
                </div>

                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <input
                    min={1}
                    type="number"
                    className="optionInput"
                    placeholder={options.adult}
                  // value={options.adult}
                  // onChange={e => setOptions(prev => ({ ...prev, adult: prev.adult + 1 }))}
                  />
                </div>

                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <input
                    min={0}
                    type="number"
                    className="optionInput"
                    placeholder={options.children}
                  // value={options.children}
                  />
                </div>

                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <input
                    min={1}
                    type="number"
                    className="optionInput"
                    placeholder={options.room}
                  // value={options.room}
                  />
                </div>

              </div>

            </div>

            <button
              className="listSearchBtn"
              onClick={handelClick}
            >
              Search
            </button>

          </div>

          <div className="searchResult">
            {
              loading
                ? <Circles color="#003580" />
                : data && data?.map((item, i) => <SearchItem key={i} item={item} demoData={demoData} i={i} />)
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default HotelList