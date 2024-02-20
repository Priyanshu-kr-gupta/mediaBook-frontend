import React, { useEffect, useState ,useContext} from 'react'
import "../css/pageCss/Connection.css"
import socket from '../socket';
import {Link} from "react-router-dom"
export default function Connections() {




 
const [connections,setConnections]=useState([]);
const backendApi = process.env.REACT_APP_BACKEND_API;

 useEffect(() => {

const fetchData = async () => {
  const response = await fetch(`${backendApi}/api/user/getConnections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       "auth-token": localStorage.getItem("auth-token")

    },
  });
  const json = await response.json();
  setConnections(json.allConnections);

};
      fetchData();
  
 },[]);



 useEffect(()=>{
   
  socket.on("newUser",(data) =>{
   const n=document.getElementById(data+"-status");
   if(n)
    n.style.backgroundColor="greenyellow"
  })
  socket.on("leaveUser",(data) =>{
    console.log(data)
   const n=document.getElementById(data+"-status");
   if(n)
    n.style.backgroundColor="grey"
  })
},[])
  

  return (
    
    <div className='allConnections'>
         {connections.map(user => (
           <div key={user._id} className='connectionBox'>
            <div className='connectionuserCred'>
            <div id={user._id+"-status"} className='onlineStatus'  style={{backgroundColor:(user.status==="1")?"greenyellow":"grey"}}></div>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>


          </div>
        ))}
    <Link to="/chat"><button>Join Chat</button></Link>
   </div>
  )
}
