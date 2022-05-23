import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ApartmentIcon from '@mui/icons-material/Apartment';
import KingBedIcon from '@mui/icons-material/KingBed';
import { useDarkModeContext } from "../../context/DarkModeContext";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import './Sidebar.scss'



// this component call from ==> 🟨 ../pages/Home.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/> 
// this component call from ==> 🟨 ../pages/Single.js 🟨 <Component/>
const Sidebar = () => {

  const { dispatch } = useDarkModeContext();
  const { dispatch : userDispatch } = useAuthContext();

  const handleLogOut = () => {
    userDispatch({ type: 'LOGOUT' });
    localStorage.clear()
  }

  return (
    <div className='sideBar'>

      <div className="top">
        <Link to='/'>
          <span className="logo"> Hotel Booking </span>
        </Link>
      </div>


      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to='/'>
            <li> <DashboardIcon className="icon" /> <span>Dashboard</span></li>
          </Link>

          <p className="title">LISTS</p>
          <Link to='/users'>
            <li> <PersonOutlineIcon className="icon" /> <span>Users</span></li>
          </Link>

          <Link to='/hotels'>
            <li> <ApartmentIcon className="icon" /> <span>Hotels</span></li>
          </Link>

          <Link to='/rooms'>
            <li> <KingBedIcon className="icon" /> <span>Rooms</span></li>
          </Link>

          {/* import LocalShippingIcon from "@mui/icons-material/LocalShipping"; */}
          {/* <li> <LocalShippingIcon className="icon" /> <span>Delivery</span></li> */}

          <p className="title">USER</p>
          <li className="notWorking"> <InsertChartIcon className="icon" /> <span>Status</span></li>
          <li className="notWorking"> <NotificationsNoneIcon className="icon" /> <span>Notifications</span></li>

          <p className="title">SERVICE</p>
          <li className="notWorking"> <SettingsApplicationsIcon className="icon" /> <span>Settings</span></li>
          <li className="notWorking"> <SettingsSystemDaydreamOutlinedIcon className="icon" /> <span>System Health</span></li>
          <li className="notWorking"> <PsychologyOutlinedIcon className="icon" /> <span>Log</span></li>

          <p className="title">USEFUL</p>
          <li className="notWorking"> <AccountCircleOutlinedIcon className="icon" /> <span>Profile</span></li>
          <li onClick={handleLogOut}> <ExitToAppIcon className="icon" /> <span>Logout</span></li>
        </ul>
      </div>


      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
      </div>

    </div>
  )
}

export default Sidebar