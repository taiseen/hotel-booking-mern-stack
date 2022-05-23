import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import './Featured.scss'


// this component call from ==> 🟨 ../pages/Home.js 🟨 <Component/>
const Featured = () => {

    return (
        <div className='featured'>

            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>

            <div className="bottom">

                <div className="featuredChart">
                    <CircularProgressbar
                        text='70%'
                        value={70}
                        strokeWidth={6}
                        styles={buildStyles({
                            textColor: '#6439ff',
                            pathColor: '#7451f8',
                        })}
                    />
                </div>

                <p className="title">Total sales today</p>
                <p className="amount">$680</p>
                <p className="desc"> Previous transactions processing. <br /> Last payments may not be included.</p>

                <div className="summary">

                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="resultAmount">$ 10.5k</div>
                        </div>

                    </div>


                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$ 30.5k</div>
                        </div>
                    </div>


                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$ 95.5k</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Featured