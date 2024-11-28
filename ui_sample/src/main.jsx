import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dummy from './bot/Dummy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Dummy/>
  </StrictMode>,
)
