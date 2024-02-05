import React, { useEffect, useState ,useContext} from 'react'
import "../css/pageCss/Connection.css"
import ContextApi from "../context/ContextApi";


export default function Connections() {
  const sk = useContext(ContextApi);

  const { newUser } = sk;




 
const [connections,setConnections]=useState([]);
const backendApi = process.env.REACT_APP_BACKEND_API;
// socket.on("newUser",(data) =>{

//   console.log(data)
// })
 useEffect(() => {

 console.log(newUser)
 const newArr=connections.map(obj=>{
  if(obj._id===newUser)
    return ({...obj,status:1})
  else
  return obj 
 })
 setConnections(newArr)
     fetchData();
 




   }, [newUser]);
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

  return (
   <div className='allConnections'>
         {connections.map(user => (
           <div key={user._id} className='connectionBox'>
            <div className='connectionuserCred'>
            <div className='onlineStatus' style={{backgroundColor:(user.status)?"greenyellow":"grey"}}></div>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>


          </div>
        ))}

   </div>
  )
}
