import { hotelColumns, roomColumns, userColumns } from "./constants/dataTableSource";
import { Home, List, Login, NewUser, NewHotel, NewRoom, Single } from './pages';
import { hotelInputs, roomInputs, userInputs } from "./constants/formSource";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkModeContext } from "./context/DarkModeContext";
import { useAuthContext } from "./context/AuthContext";
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

            <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path='login' element={<Login />} />


            <Route path='users'>
              <Route index element={<ProtectedRoute> <List columns={userColumns} /> </ProtectedRoute>} />
              <Route path=':id' element={<ProtectedRoute> <Single /> </ProtectedRoute>} />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewUser inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              } />
            </Route>


            <Route path='hotels'>
              <Route index element={<ProtectedRoute> <List columns={hotelColumns} /> </ProtectedRoute>} />
              <Route path=':id' element={<ProtectedRoute> <Single /> </ProtectedRoute>} />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewHotel inputs={hotelInputs} title="Add New Hotel" />
                </ProtectedRoute>
              } />
            </Route>


            <Route path="rooms">
              <Route index element={<ProtectedRoute> <List columns={roomColumns} /> </ProtectedRoute>} />
              <Route path=":id" element={<ProtectedRoute> <Single /> </ProtectedRoute>} />
              <Route path="new" element={
                <ProtectedRoute>
                  <NewRoom inputs={roomInputs} title="Add New Room" />
                </ProtectedRoute>
              } />
            </Route>


          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App