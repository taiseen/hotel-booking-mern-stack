import './SearchItem.scss'

// this <Component /> call from 🟨 ../../pages/HotelList.js 🟨 <Component />
const SearchItem = () => {

    return (
        <div className='searchItem'>
            <img
                alt=""
                className="searchImg"
                src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
            />

            <div className="searchDesc">
                <h1 className="searchTitle">Tower Street Apartments</h1>
                <span className="searchDistance">500m from center</span>
                <span className="searchTaxiOp">Free airport taxi</span>
                <span className="searchSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="searchFeatures">
                    Entire studio • 1 bathroom • 21m² 1 full bed
                </span>
                <span className="searchCancelOp">Free cancellation </span>
                <span className="searchCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>

            <div className="searchDetails">
                <div className="searchRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className="searchDetailTexts">
                    <span className="searchPrice">$112</span>
                    <span className="searchTaxOp">Includes taxes and fees</span>
                    <button className="searchCheckButton">See availability</button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem