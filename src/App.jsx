import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Map from './pages/Map'
import Create from './pages/Create'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create/:mapid" element={<Create />} />
          <Route path="/:mapid" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
