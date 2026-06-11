import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SyllabusProvider } from './context/SyllabusContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SyllabusProvider>
      <App />
    </SyllabusProvider>
  </StrictMode>,
)

