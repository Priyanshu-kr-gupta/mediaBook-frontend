import React,{useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {

  return (
    <nav>
   
      <Link to="/">mediaBook-2.O</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
  
    </nav> 
  )
}

export default Navbar
