import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Home, HotelList, Hotel, Login } from './pages';


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;