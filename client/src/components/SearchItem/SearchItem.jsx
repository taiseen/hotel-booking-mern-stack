import { Link } from 'react-router-dom'
import './SearchItem.scss'


// this <Component /> call from 🟨 ../../pages/HotelList.js 🟨 <Component />
const SearchItem = ({ item, demoData , i}) => {


    return (
        <div className='searchItem'>
            <img
                alt={item.name}
                className="searchImg"
                src={demoData?.propertyList[i]?.imgLink}
            />

            <div className="searchDesc">
                <h1 className="searchTitle">{item.name}</h1>
                <span className="searchDistance">{item.distance} || {item.city} </span>
                <span className="searchTaxiOp">Free airport taxi</span>
                <span className="searchSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="searchFeatures">
                    Entire studio • 1 bathroom • 21m² 1 full bed <br /> {item.distance}
                </span>
                <span className="searchCancelOp">Free cancellation </span>
                <span className="searchCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>

            <div className="searchDetails">
                {
                    item.rating &&
                    <div className="searchRating">
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>
                }
                <div className="searchDetailTexts">
                    <span className="searchPrice">${item.cheapestPrice}</span>
                    <span className="searchTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="searchCheckButton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem