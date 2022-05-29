import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { allRooms, creatingNewHotel, imageUpload } from "../../hooks/useFetch";
import { Navbar, Sidebar } from '../../components'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './NewHotel.scss'


const NewHotel = ({ inputs, title }) => {

  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState('');
  const [rooms, setRooms] = useState([]);

  const { data, loading } = allRooms();


  // 1st) 🟨🟨🟨 collect all input infos
  const handleChange = e => {
    const { id, value } = e.target;
    setInfo(prev => ({ ...prev, [id]: value }));
  };


  // 2nd) 🟨🟨🟨 multiple hotel select option
  const handleSelect = (e) => {
    const selectedRooms = Array.from(
      e.target.selectedOptions,
      option => option.value
    )
    setRooms(selectedRooms)
  }


  // 3rd) 🟨🟨🟨 infos + image[array] send into server... 
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // 🟩🟩 upload multiple images together...
      const imgList = await Promise.all(
        Object.values(files).map(async img => {

          // 🟩🟩 transfer image file into FormDat 
          const data = new FormData();
          data.append("file", img);
          data.append("upload_preset", "upload");

          // 🟩🟩 image upload in another server 
          // 🟩🟩 + get that image object url
          const { data: { url } } = await imageUpload(data);

          return url;
        })
      )

      // 🟩🟩 user info + rooms + img urls aggregate & send to the server 
      const newHotel = { ...info, rooms, photos: imgList };

      // 🟩🟩 all info save into database
      await creatingNewHotel(newHotel);
      navigate('/hotels');
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

          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt='multiple img'
              onClick={() => setFiles('')}
            />
          </div>

          <div className="right">

            <form>

              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  multiple
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={e => setFiles(e.target.files)}
                />
              </div>

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
                <label>Featured</label>
                <select id='featured' onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="selectRoom">
                <label>Rooms</label>
                <select multiple id='room' onChange={handleSelect}>
                  {
                    loading
                      ? 'loading...'
                      : data?.map(room => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))
                  }
                </select>
              </div>


              <button onClick={handleClick}>Send</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel