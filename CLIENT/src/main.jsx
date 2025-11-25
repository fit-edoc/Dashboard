import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProdiver } from './context/Datacontext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProdiver>
<BrowserRouter>
    <App />
</BrowserRouter>
    </DataProdiver>
  </StrictMode>,
)
