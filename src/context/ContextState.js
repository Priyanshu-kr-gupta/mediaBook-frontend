import { useEffect, useState } from "react";
import ContextApi from "./ContextApi";
import { io } from 'socket.io-client';

const ContextState=(props)=>{
    
    
    const [socket, setSocket] = useState();
  const [newUser,setNewuser] = useState([]);

    
 
  useEffect(()=>{
   

      const authToken = localStorage.getItem('auth-token');
      
      const socket = io("http://localhost:5000", {
        auth: {
          token: authToken
        }
      });
      setSocket(socket);
 
    socket.on("newUser",(data)=>{
      // console.log(data)
      setNewuser(data);
        })
    
  },[])
    return(
        <ContextApi.Provider value={{newUser,socket}}>
            {props.children}
        </ContextApi.Provider>
    ) 
}

export default ContextState;