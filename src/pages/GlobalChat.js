import React, { useEffect, useState } from 'react'
import "../css/pageCss/GlobalChat.css"
import socket from '../socket'
import Header from '../components/Header';
export default function GlobalChat() {
    const [allMessage,setAllMessage]=useState([]);
    const [message,setMessage]=useState('');
    const [newUser,setNewUser]=useState('');
    const backendApi = process.env.REACT_APP_BACKEND_API;

    const findNewUser = async (user) =>{ 
        const response=await fetch(`${backendApi}/api/user/getSearchedUser`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify({id:user}),
          
        }
  
        )
        const data=await response.json();
        setNewUser(data.user)

      }

    useEffect(()=>{
        socket.emit("newChatUser","globalChatRoom");
        socket.on("newChatUser",(user)=>{
            // console.log(user);
            // setNewUser(user);
            findNewUser(user)
            setTimeout(() => {
                setNewUser(null);
            }, 2000);
        })
        socket.on("newMessage",(data)=>{
            console.log(data);
            setAllMessage(prevallMessages => [...prevallMessages, data]);
        })
    },[])
    const sendMessage = ()=>{
      
        setAllMessage(prevallMessages => [...prevallMessages, message]);

        socket.emit("sendMessage","globalChatRoom",message);
        setMessage("");
    }
  return (
    <>
    <div className='globalChatContainer'>
    {/* <Header /> */}
        <div className='globalChats'>
            <div className='Allchats'>
                {
                    allMessage.map((msgs,index)=>{
                        return <div key={index}>{msgs.msg}</div>
                    })
                }
                 <div className='typingUsers'></div>
            </div>
           
      
        <div className='typeChat'>
            <textarea type='text' onChange={(e)=>{setMessage(e.target.value)}} value={message} rows={1}/>
            <button onClick={sendMessage}>send</button>
        </div>
    </div>

    </div>
    {newUser && (
                <div className='newUser'>
                    <img src={newUser.profilePhoto}/><br/>
                    {newUser.name} joined
                </div>
            )}
    </>
  )
}
