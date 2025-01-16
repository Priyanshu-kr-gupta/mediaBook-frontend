import React, { useEffect, useState } from 'react'
import "../css/componentCss/NotificationBox.css"

import {initializeSocket} from '../socket';

import {Link} from "react-router-dom"

export default function NotificationBox() {
  const socket=initializeSocket();
  const [notifications,setNotifications]=useState([]);
  const backendApi = process.env.REACT_APP_BACKEND_API;
  const userId=localStorage.getItem("userid");
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
        socket.on("newNotification",(recData,senderData)=>{
          // console.log(recData,senderData)
          if(userId===recData && senderData!=userId)
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
