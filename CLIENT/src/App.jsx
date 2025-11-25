import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useData } from './context/Datacontext'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import SinglePage from './Dashboard/SinglePage'

function App() {
 


  return (
   <>
   
   <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path={`/single/:id`}  element={<SinglePage/>}/>
   </Routes>
   
   </>
  )
}

export default App
