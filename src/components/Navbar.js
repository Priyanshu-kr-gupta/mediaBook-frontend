import React,{useEffect, useState} from 'react'
import {Link,useLocation } from "react-router-dom"
import "../css/componentCss/Navbar.css"
import { AiOutlineMessage } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
// import profileIcon from "../icons/profile.svg"
import { GiHamburgerMenu } from "react-icons/gi";
// import { IoIosSearch} from "react-icons/io";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
function Navbar() {
  const [tgle,setTgle]=useState(0)
  
  let location=useLocation();
  useEffect(()=>{
    // console.log(location)
  },[location])
  return (
    <>
    
    <nav>
      <div className='toggler'>

    <GiHamburgerMenu onClick={()=>{setTgle(!tgle)}}/>
      </div>
    <div id='navMenu' style={{width:(!tgle)?"100%":"0%"}}>
      
    <Link to="/" ><AiOutlineHome  style={{color:(location.pathname==="/") ? "black" : ""} }/></Link>
    <Link to="/search"  ><MdOutlinePersonAddAlt  style={{color:(location.pathname==="/search") ? "black" : ""} }/></Link>
    <Link to="/connections" ><AiOutlineMessage  style={{color:(location.pathname==="/connections") ? "black" : ""} }/></Link>
    <Link to="/create"  ><RiImageAddLine  style={{color:(location.pathname==="/create") ? "black" : ""} }/></Link>
    <Link to="/profile"  ><CgProfile  style={{color:(location.pathname==="/profile") ? "black" : ""} }/></Link>
    </div>
    </nav> 
    </>
  )
}

export default Navbar
