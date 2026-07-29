import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/home'
import Userlogin from './Pages/userlogin'
import Usersignup from './Pages/usersignup'
import Captainlogin from './Pages/captainlogin'
import Captainsignup from './Pages/captainsignup'

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Userlogin/>} />
        <Route path="/signup" element={<Usersignup/>} />
        <Route path="/captain-login" element={< Captainlogin/>} />
        <Route path="/captain-signup" element={< Captainsignup/>} />

      </Routes>
    
  )
}

export default App