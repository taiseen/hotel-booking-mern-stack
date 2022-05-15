import { Circles } from 'react-loader-spinner';
import demoData from '../../constants/demoData';
import useFetch from '../../constants/useFetch';
import './Featured.scss';


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
const Featured = () => {

  const { data, loading } = useFetch('/hotels/countByCity?cities=Tokio,France,London');

  return (
    <div className="featured">
      {
        loading
          ? <Circles color="#003580" />
          : demoData?.featured.map((item, i) => (
            <div className="featuredItem" key={i}>
              <img
                alt={item.name}
                src={item.imgLink}
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>{item.name}</h1>
                <h2>{data[i]}</h2>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default Featured