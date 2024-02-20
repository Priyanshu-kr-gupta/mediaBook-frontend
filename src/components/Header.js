import React, { useEffect, useState } from 'react'
import "../css/componentCss/Header.css"
import NotificationBox from './NotificationBox';
import socket from '../socket';

export default function Header() {
  const [noti,setNoti]=useState(false);
  const [notificationCount,setNotificationCount]=useState("0");
  const backendApi = process.env.REACT_APP_BACKEND_API;
  
  const getNotificationCnt=async()=>{
    const res = await fetch(`${backendApi}/api/user/getNotificationsCnt`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
        

      },
  }

  )
  const data=await res.json();
  setNotificationCount(data);
  
}
  useEffect(()=>{
    getNotificationCnt();
    socket.on("newNotification",(data)=>{
      // console.log(data);
      getNotificationCnt();
  })
  },[])
  return (
    <>
      <div className='header'>
        <h3>MediaBook 2.O</h3>
        <button notification_count={notificationCount} onClick={()=>{setNoti(!noti)}}>{noti?"❌":"🔔"}</button>
    </div>
    {noti && 
  <NotificationBox/>
    }
    </>
  )
}
