import { useParams } from "react-router-dom";
import { Sidebar, Navbar, Chart, TableList } from "../../components";
import { getUser } from "../../hooks/useFetch";
import "./Single.scss";


// this component call from ==> 🟨 ../App.js 🟨 React <Router />
const Single = () => {

    const { id } = useParams()

    const { data, loading } = getUser(id);


    return (
        <div className="single">

            <Sidebar />

            <div className="singleContainer">

                <Navbar />

                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img
                                src={
                                    data === null
                                        ? "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                        : data?.img
                                }
                                alt={data?.userName}
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{data?.userName}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data?.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data?.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                        {data?.city}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{data?.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <Chart title={'Last 6 Months (Revenue)'} aspect={2 / 1} />
                    </div>
                </div>

                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <TableList />
                </div>

            </div>
        </div>
    );
};

export default Single;