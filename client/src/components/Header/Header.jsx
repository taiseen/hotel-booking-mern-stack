import "react-date-range/dist/styles.css"; // main css file | this file must br top of "theme css file".
import "react-date-range/dist/theme/default.css"; // theme css file | for hover color + soft animation.
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchContext } from "../../context/SearchContext";
import { useAuthContext } from "../../context/AuthContext";
import { NEW_SEARCH } from "../../constants/actionTypes";
import { useNavigate, Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import './Header.scss';


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
// this <Component /> call from 🟨 ../../pages/HotelList.js 🟨 <Component />
const Header = ({ type }) => {

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch } = useSearchContext();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


  // handle data manipulation for useState options variable...
  // object{ key:value } +/-
  const handleOptions = (name, operation) => {
    setOptions(prev => ({
      ...prev, [name]: operation === 'i'
        ? prev[name] + 1
        : prev[name] - 1
    }))
  }

  const handleDestination = () => {
    setOpenOptions(false)
    setOpenDate(false)
  }

  const handelToggling = (value) => {
    if (value) {
      setOpenDate(!openDate)
      setOpenOptions(false)
    } else {
      setOpenDate(false)
      setOpenOptions(!openOptions)
    }
  }


  // 🟨🟨🟨 data send through the help of react-router-dom...
  const handleSearch = () => {
    dispatch({ type: NEW_SEARCH, payload: { destination, dates, options } })
    navigate('/hotels', { state: { destination, dates, options } })
    setOpenOptions(false)
    setOpenDate(false)
  }



  return (
    <div className='header'>

      <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>

        <div className="headerList">

          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>

        </div>

        {
          type !== 'list' &&
          <>
            <h1 className="headerTitle">
              A lifetime of discount ? It's genius
            </h1>

            <p className="headerDecs">
              Get rewarded for your travels – unlock instant savings of 10% or more with a free hotel-booking account
            </p>

            {
              !user && <Link to='/login'>
                <button className="headerBtn">Sign in / Register</button>
              </Link>
            }


            {/* 🟨🟨🟨 UI for ==> search by date for hotel booking */}
            <div className="headerSearch">

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  required
                  type="text"
                  placeholder='Where are you going?'
                  className='headerSearchInput'
                  onClick={handleDestination}
                  onChange={e => setDestination(e.target.value)}
                />
              </div>


              {/* 🟨🟨🟨 UI for ==> Calender & its functionality... */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

                <span
                  className='headerSearchText'
                  onClick={() => handelToggling(true)}
                >
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
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    className="ourCustomDateForPosition"
                    onChange={item => setDates([item.selection])}
                  />
                }
              </div>


              {/* for ==> (·) press ==> alt + 0 + 1 + 8 + 3 */}
              {/* 🟨🟨🟨 UI for ==> Adult + Children + Room... */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className='headerSearchText'
                  onClick={() => handelToggling(false)}
                >
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>

                {
                  openOptions &&
                  <div className="options">

                    <div className="optionItems">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions('adult', 'd')}
                          disabled={options.adult <= 1}
                        >
                          -
                        </button>
                        <span className="optionNumber">{options.adult}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions('adult', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItems">
                      <span className="optionText">children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions('children', 'd')}
                          disabled={options.children <= 0}
                        >
                          -
                        </button>
                        <span className="optionNumber">{options.children}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions('children', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItems">
                      <span className="optionText">room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions('room', 'd')}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionNumber">{options.room}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions('room', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                }


              </div>

              <div className="headerSearchItem">
                <button
                  className="headerBtn"
                  onClick={handleSearch}
                >
                  Search</button>
              </div>

            </div>
          </>
        }

      </div>
    </div>
  )
}

export default Header