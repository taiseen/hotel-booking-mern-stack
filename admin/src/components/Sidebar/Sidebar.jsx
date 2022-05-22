import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StoreIcon from "@mui/icons-material/Store";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { Link } from 'react-router-dom';
import './Sidebar.scss'


// this component call from ==> 🟨 ../pages/Home.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/> 
// this component call from ==> 🟨 ../pages/Single.js 🟨 <Component/>
const Sidebar = () => {

  const { dispatch } = useDarkModeContext();

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
            <li> <StoreIcon className="icon" /> <span>Products</span></li>
          </Link>

          <Link to='/rooms'>
            <li> <CreditCardIcon className="icon" /> <span>Orders</span></li>
          </Link>

          <li> <LocalShippingIcon className="icon" /> <span>Delivery</span></li>

          <p className="title">USER</p>
          <li> <InsertChartIcon className="icon" /> <span>Status</span></li>
          <li> <NotificationsNoneIcon className="icon" /> <span>Notifications</span></li>

          <p className="title">SERVICE</p>
          <li> <SettingsApplicationsIcon className="icon" /> <span>Settings</span></li>
          <li> <SettingsSystemDaydreamOutlinedIcon className="icon" /> <span>System Health</span></li>
          <li> <PsychologyOutlinedIcon className="icon" /> <span>Log</span></li>

          <p className="title">USEFUL</p>
          <li> <AccountCircleOutlinedIcon className="icon" /> <span>Profile</span></li>
          <li> <ExitToAppIcon className="icon" /> <span>Logout</span></li>
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