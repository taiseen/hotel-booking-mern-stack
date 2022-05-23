import { useAuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../constants/actionTypes";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.scss'


// this <Component /> call from 🟨 ../../pages/Home.js 🟨 <Component />
// this <Component /> call from 🟨 ../../pages/HotelList.js 🟨 <Component />
const Navbar = () => {

  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  // user logout function
  const handleLogOut = () => {
    dispatch({ type: LOGOUT });
    localStorage.clear()
  }

  // login by Registration Button...
  const handleLoginRegister = () => {
    navigate('/login', { state: true })
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
                <button className="navBtn" onClick={handleLoginRegister}>Register</button>

                <Link to='/login'>
                  <button className="navBtn" onClick={handleLoginRegister}>Login</button>
                </Link>
              </>
          }
        </div>
      </div>



    </div>
  )
}

export default Navbar