import React, { useEffect, useState } from 'react'
import "../css/componentCss/NotificationBox.css"
import socket from '../socket';
import {Link} from "react-router-dom"

export default function NotificationBox() {
  const [notifications,setNotifications]=useState([]);
  const backendApi = process.env.REACT_APP_BACKEND_API;
  const getNotification=async()=>{
    const res = await fetch(`${backendApi}/api/user/getNotifications`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
        

      },
  }

  )
  const data=await res.json();
  setNotifications(data);
  
}
    useEffect(()=>{
        getNotification();
        socket.on("newNotification",(data)=>{
          // console.log(data);
          getNotification();
      })
        
    },[])
  return (
    <div className='notification'>  
       {notifications.map((notificationData) => (
        <div className='notificationBox' key={notificationData._id}>
          <Link to={notificationData.source}>{notificationData.message}</Link>
          </div>
          ))}
    
        </div>
  )
}
