import React,{useEffect} from 'react'
import {Link,useLocation } from "react-router-dom"
import "../css/componentCss/Navbar.css"
import homeIcon from "../icons/home.svg"
import searchIcon from "../icons/search.svg"
import messageIcon from "../icons/message.svg"
import addIcon from "../icons/add.svg"
import profileIcon from "../icons/profile.svg"
function Navbar() {
  let location=useLocation();
  useEffect(()=>{
    // console.log(location)
  },[location])
  return (
    
    <nav>
    <div className='navMenu'>
      <h4>MediaBook 2.O</h4>
    <Link to="/home"     style={{backgroundColor:(location.pathname==="/home") ? "aqua" : ""} }><img src={homeIcon} alt='not found'/>Home</Link>
    <Link to="/search"   style={{backgroundColor:(location.pathname==="/search") ? "aqua" : ""}}><img src={searchIcon} alt='not found'/>Search</Link>
    <Link to="/messages" style={{backgroundColor:(location.pathname==="/messages") ? "aqua" : ""}}><img src={messageIcon} alt='not found'/>Message</Link>
    <Link to="/create"   style={{backgroundColor:(location.pathname==="/create") ? "aqua" : ""}}><img src={addIcon} alt='not found'/>create</Link>
    <Link to="/profile"  style={{backgroundColor:(location.pathname==="/profile") ? "aqua" : ""}}><img src={profileIcon} alt='not found'/>Profile</Link>
    </div>
    </nav> 
  )
}

export default Navbar
