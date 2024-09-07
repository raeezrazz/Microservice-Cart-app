import { useState } from 'react'
import { BrowserRouter as Router,
Routes,Route , Navigate } from 'react-router-dom'
import './index.css'
import Login from './components/Login'
import Signup from './components/Signup'
import ListProduct from './components/ListProduct'

function App() {
  

  return (
 
    <>
   
    <Router>
      <Routes>
        <Route path ='/' element={<ListProduct/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>

    </Router>
    </>
  )
}

export default App
