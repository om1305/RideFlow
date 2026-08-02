import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import CaptainContext from './Context/captain.context.jsx'
import UserContext from './Context/user.context.jsx'
import SocketProvider from './Context/socket.context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
    <CaptainContext>
      <SocketProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </SocketProvider>
    </CaptainContext>
    </UserContext>
  </StrictMode>,
)
