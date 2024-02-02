import React, { useEffect, useState } from 'react'
import "../css/pageCss/Connection.css"

export default function Connections() {

const [connections,setConnections]=useState([]);
const backendApi = process.env.REACT_APP_BACKEND_API;

 useEffect(() => {
   
 
     fetchData();
 
 
   }, []);
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
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>


          </div>
        ))}

   </div>
  )
}
