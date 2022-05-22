import { hotelColumns, roomColumns, userColumns } from "./constants/dataTableSource";
import { Home, List, Login, NewUser, NewHotel, NewRoom, Single } from './pages';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkModeContext } from "./context/DarkModeContext";
import { useAuthContext } from "./context/AuthContext";
import { userInputs } from "./constants/formSource";
import "./style/dark.scss";


const App = () => {

  const { darkMode } = useDarkModeContext();

  const ProtectedRoute = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <BrowserRouter>
        <Routes>
          <Route path='/'>

            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />

            <Route path='users'>
              <Route index element={<List columns={userColumns} />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<NewUser inputs={userInputs} title="Add New User" />} />
            </Route>

            <Route path='hotels'>
              <Route index element={<List columns={hotelColumns} />} />
              <Route path=':id' element={<Single />} />
              <Route path='new' element={<NewHotel />} />
            </Route>

            <Route path="rooms">
              <Route index element={<List columns={roomColumns} />} />
              <Route path=":id" element={<Single />} />
              <Route path="new" element={<NewRoom />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App