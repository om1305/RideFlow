import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/home'
import Userlogin from './Pages/userlogin'
import Usersignup from './Pages/usersignup'
import Captainlogin from './Pages/captainlogin'
import Captainsignup from './Pages/captainsignup'
import Userhome from './Pages/userhome'
// import UserprotectedWrapper from './Pages/protectedWrapper'
import Captainhome from './Pages/captainhome'
import CaptainProtectWrapper from './Pages/captainprotectedwrapper'
import UserProtectedWrapper from './Pages/protectedWrapper'

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Userlogin/>} />
        <Route path="/signup" element={<Usersignup/>} />
        <Route path="/captain-login" element={< Captainlogin/>} />
        <Route path="/captain-signup" element={< Captainsignup/>} />
        <Route path='/user-home' element={
          <UserProtectedWrapper>
            <Userhome/>
          </UserProtectedWrapper>
          } />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <Captainhome/>
          </CaptainProtectWrapper>
        }/>

      </Routes>
    
  )
}

export default App