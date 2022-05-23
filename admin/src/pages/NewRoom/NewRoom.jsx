import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { allHotels, creatingNewRoom, creatingNewUser, imageUpload } from "../../hooks/useFetch";
import { Navbar, Sidebar } from '../../components'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './NewRoom.scss'


const NewRoom = ({ inputs, title }) => {

  const navigate = useNavigate();
  const { data, loading } = allHotels();
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(undefined);


  const handleChange = e => {
    const { id, value } = e.target;
    setInfo(prev => ({ ...prev, [id]: value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms
      .split(',')
      .map(roomNum => ({ number: roomNum.trim('') }))
      
    const totalRoomInfo = { ...info, hotelId, roomNumbers }

    try {
      // all info save into database
      await creatingNewRoom(hotelId, totalRoomInfo);
      navigate('/rooms');
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="newUser">

      <Sidebar />

      <div className="newContainer">

        <Navbar />

        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">

          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt={file.name}
              onClick={() => setFile('')}
            />
          </div> */}

          <div className="right">

            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={e => setFile(e.target.files[0])}
                />
              </div> */}

              {
                inputs.map(input => (
                  <div className="formInput" key={input.id}>

                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                    />

                  </div>
                ))
              }

              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  placeholder="give comma between room numbers"
                  onChange={e => setRooms(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Choose a hotel</label>
                <select id='hotelId' onChange={e => setHotelId(e.target.value)}>
                  <option>Select a Hotel</option>
                  {
                    loading
                      ? 'Loading...'
                      : data && data?.map(hotel => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))
                  }
                </select>
              </div>

            </form>

            <button onClick={handleClick}>Send</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom