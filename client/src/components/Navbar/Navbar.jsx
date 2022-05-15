import { Link } from "react-router-dom";
import './Navbar.scss'


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
// this <Component /> call from 🟨 ../../pages/HotelList.js 🟨 <Component />
const Navbar = () => {

  return (
    <div className="navbar">

      <div className="navContainer">

        <Link to='/'>
          <span className="logo">Hotel Booking</span>
        </Link>

        <div className="navItems">
          <button className="navBtn">Register</button>
          <Link to='/login'>
            <button className="navBtn">Login</button>
          </Link>
        </div>
      </div>



    </div>
  )
}

export default Navbar