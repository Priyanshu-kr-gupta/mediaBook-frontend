import React, { useEffect, useState ,useContext} from 'react'
import "../css/pageCss/Connection.css"
import socket from '../socket';
import {Link} from "react-router-dom"
export default function Connections() {




 
const [connections,setConnections]=useState([]);
const backendApi = process.env.REACT_APP_BACKEND_API;


// const updateUsers = async(data)=>{
//   console.log("i am also called")
//   console.log(connections)
//   const newArr=connections.map(obj=>{
//        if(data.indexOf(obj._id) !== -1)
//         return ({...obj,status:1})
//       else
//       return ({...obj,status:0})
    
//   })
//   setConnections(newArr);
// }
 useEffect(() => {

//  console.log(newUser)
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
   
  // socket.on("newUser",(data) =>{
  //   console.log(data)
    // console.log(connections)
    // console.log("called")
    // updateUsers(data);
    // console.log(connections)
  
   
  // })

},[])


//  useEffect(() => {
    
    // const newArr=connections.map(obj=>{
    //   if(newUser.indexOf(obj._id) !== -1)
    //     return ({...obj,status:1})
    //   else
    //   return ({...obj,status:0})
    //  })
    //  setConnections(newArr)





  //  }, []);
  

  return (
    
    <div className='allConnections'>
         {connections.map(user => (
           <div key={user._id} className='connectionBox'>
            <div className='connectionuserCred'>
            <div className='onlineStatus' style={{backgroundColor:(user.status==="1")?"greenyellow":"grey"}}>{user.status}</div>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>


          </div>
        ))}
    <Link to="/chat"><button>Join Chat</button></Link>
   </div>
  )
}
