import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'quill/dist/quill.snow.css'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './pages/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
   
       <App />
    
    </UserProvider>
  </StrictMode>
)
