import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDarkModeContext } from "../../context/DarkModeContext";
import './Navbar.scss'


// this component call from ==> 🟨 ../pages/Home.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/Single.js 🟨 <Component/>
const Navbar = () => {

    const { darkMode, dispatch } = useDarkModeContext();

    return (
        <div className="navbar">
            <div className="wrapper">

                <div className="searchBar">
                    <input type="text" placeholder='Search...' />
                    <SearchOutlinedIcon />
                </div>

                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icon" />
                        English
                    </div>

                    <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
                        {
                            darkMode
                                ? <LightModeIcon className="icon" />
                                : <DarkModeOutlinedIcon className="icon" />
                        }
                    </div>

                    <div className="item">
                        <FullscreenExitOutlinedIcon className="icon" />
                    </div>

                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>

                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>

                    <div className="item">
                        <ListOutlinedIcon className="icon" />
                    </div>

                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar