import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Home, HotelList, Hotel } from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;