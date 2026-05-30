import {Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectRoute";
import Dashboard from "./pages/Dashboard";
import React from 'react'
import './styles/app.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}

export default App