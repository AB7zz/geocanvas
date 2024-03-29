import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Map from './pages/Map'
import Create from './pages/Create'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:mapid" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
