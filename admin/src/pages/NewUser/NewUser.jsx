import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Sidebar, Navbar } from "../../components";
import { creatingNewUser, imageUpload } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NewUser.scss";


// this component call from ==> 🟨 ../App.js 🟨 React <Router />
const NewUser = ({ inputs, title }) => {

  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [info, setInfo] = useState({});

  const handleChange = e => {
    const { id, value } = e.target;
    setInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // 🟩🟩 transfer image file into FormDat 
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      // 🟩🟩 image upload in another server  
      // 🟩🟩 + get that image object url
      const { data: { url } } = await imageUpload(data);
      // const { url } = uploadRes.data;
      
      // 🟩🟩 user info + img url, send to the server 
      const newUser = { ...info, img: url };

      // 🟩🟩 all info save into database
      await creatingNewUser(newUser);
      navigate('/users');

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
              src={file
                ? URL.createObjectURL(file)
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt={file.name}
              onClick={() => setFile('')}
            />
          </div>

          <div className="right">

            <form>

              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={e => setFile(e.target.files[0])}
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
              <button onClick={handleClick}>Send</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
