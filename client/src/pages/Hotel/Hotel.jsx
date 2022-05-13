import { Link } from 'react-router-dom'
import './Hotel.scss'


// this <Component /> call from 🟨 App.js 🟨 <Component />
// by the help of React <Router> DOM
const Hotel = () => {


  return (
    <div className='hotel'>

      <Link to='/'>
        go to home
      </Link>
    </div>
  )
}

export default Hotel