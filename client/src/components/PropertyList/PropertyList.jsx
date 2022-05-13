import data from '../../constants/data';
import './PropertyList.scss';


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
const PropertyList = () => {
    return (
        <div className='propertyList'>
            {
                data.propertyList.map(item => (
                    <div className="propertyItem" key={item.name}>
                        <img
                            alt={item.name}
                            src={item.imgLink}
                            className="propertyImg"
                        />
                        <div className="propertyTitle">
                            <h1>{item.name}</h1>
                            <h2>{item.propertyNumber}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PropertyList