import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './Features/Auth/Auth.Context.jsx'
import { SongContextProvider } from './Features/song/Song.Context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
     
    <SongContextProvider>
    <App />
    </SongContextProvider>
    </AuthContextProvider>
 
  </StrictMode>,
)
