import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Home, List, Login, New, Single } from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>

          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />

          <Route path='users'>
            <Route index element={<List />} />
            <Route path=':userId' element={<Single />} />
            <Route path='new' element={<New />} />
          </Route>


          <Route path='products'>
            <Route index element={<List />} />
            <Route path=':productsId' element={<Single />} />
            <Route path='new' element={<New />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App