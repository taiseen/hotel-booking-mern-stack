import { useAuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../constants/actionTypes";
import { Link } from "react-router-dom";
import './Navbar.scss'


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
// this <Component /> call from 🟨 ../../pages/HotelList.js 🟨 <Component />
const Navbar = () => {

  const { user, dispatch } = useAuthContext();

  const handleLogOut = () => {
    dispatch({ type: LOGOUT });
    localStorage.clear()
  }


  return (
    <div className="navbar">

      <div className="navContainer">

        <Link to='/'>
          <span className="logo">Hotel Booking</span>
        </Link>

        <div className="navItems">
          {
            user
              ? <>
                <span className="userName">{user.userName}</span>
                <button className="navBtn" onClick={handleLogOut}>Logout</button>
              </>
              : <>
                <button className="navBtn">Register</button>
                <Link to='/login'>
                  <button className="navBtn">Login</button>
                </Link>
              </>
          }
        </div>
      </div>



    </div>
  )
}

export default Navbar