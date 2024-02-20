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
    <>
    
    <nav>
    <div className='navMenu'>
      {/* <h4>MediaBook 2.O</h4> */}
    <Link to="/" ><img src={homeIcon} alt='not found'     style={{filter:(location.pathname==="/") ? "drop-shadow(0px 0px 10px aqua)" : ""} }/></Link>
    <Link to="/search"  ><img src={searchIcon} alt='not found' style={{filter:(location.pathname==="/search") ? "drop-shadow(0px 0px 10px aqua)" : ""} }/></Link>
    <Link to="/connections" ><img src={messageIcon} alt='not found' style={{filter:(location.pathname==="/connections") ? "drop-shadow(0px 0px 10px aqua)" : ""} }/></Link>
    <Link to="/create"  ><img src={addIcon} alt='not found' style={{filter:(location.pathname==="/create") ? "drop-shadow(0px 0px 10px aqua)" : ""} }/></Link>
    <Link to="/profile"  ><img src={profileIcon} alt='not found' style={{filter:(location.pathname==="/profile") ? "drop-shadow(0px 0px 10px aqua)" : ""} }/></Link>
    </div>
    </nav> 
    </>
  )
}

export default Navbar
