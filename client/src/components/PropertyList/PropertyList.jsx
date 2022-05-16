import { propertyList } from './../../constants/dataFetch';
import { Circles } from 'react-loader-spinner';
import demoData from '../../constants/demoData';
import './PropertyList.scss';


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
const PropertyList = () => {

    const { data, loading } = propertyList();

    return (
        <div className='propertyList'>
            {
                loading
                    ? <Circles color="#003580" />
                    : demoData?.propertyList.map((item, i) => (
                        <div className="propertyItem" key={i}>
                            <img
                                alt={item.name}
                                src={item.imgLink}
                                className="propertyImg"
                            />
                            <div className="propertyTitle">
                                <h1>{item.name}</h1>
                                <h2>{data[i]?.count || 0} {data[i]?.type || 0}</h2>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default PropertyList