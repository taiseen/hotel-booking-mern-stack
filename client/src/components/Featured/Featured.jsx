import data from '../../constants/data';
import './Featured.scss';


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
const Featured = () => {

  return (
    <div className="featured">
      {
        data.featured.map(item => (
          <div className="featuredItem">
            <img
              alt={item.name}
              src={item.imgLink}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{item.name}</h1>
              <h2>{item.propertyNumber}</h2>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Featured