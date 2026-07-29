import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import CaptainContext from './Context/captain.context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CaptainContext>
  </StrictMode>,
)
