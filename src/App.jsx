import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Map from './pages/Map'
import Create from './pages/Create'
import Login from './pages/Login'
import Username from './pages/Username'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/username" element={<Username />} />
          <Route path="/:username" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
