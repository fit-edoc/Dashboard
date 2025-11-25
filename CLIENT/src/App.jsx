import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useData } from './context/Datacontext'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'

function App() {
 


  return (
   <>
   <Routes>
    <Route path='/' element={<Dashboard/>}/>
   </Routes>
   
   </>
  )
}

export default App
