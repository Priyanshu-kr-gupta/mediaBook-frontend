import React,{useEffect,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/pageCss/Profile.css"

import {initializeSocket} from '../socket';


export default function Profile() {
  const socket=initializeSocket()
  const backendApi = process.env.REACT_APP_BACKEND_API;

const navigate = useNavigate()
const [user,setUser]=useState({});
const userid=localStorage.getItem("userid");
const [userpost, setUserpost] = useState([]);

const getUserPosts = async () => {
  try {
    const response = await fetch(`${backendApi}/api/post/getUserPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
   
      },
      body:JSON.stringify({userid})
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const json = await response.json();
    setUserpost(json);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

function logout()
{

    
    socket.emit("logoutuser")
  
  
  localStorage.removeItem("auth-token");
  navigate("/login");

}
const getUser =async ()=>{
  const response = await fetch(`${backendApi}/api/auth/getUser`,{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")  
    },
})
const json=await response.json()
setUser(json);
}
useEffect(()=>{
  
 getUser();
 getUserPosts();
  if(!localStorage.getItem("auth-token"))
    navigate("/login");
},[])
  
return (
    <>
    <div className='profile'>
      <div className='backgroundImage'>
        <img src={user.bgPhoto} alt='not found'/>
      </div>
      <div className='profileContainer'>
        <div className='topData'>

            {/* <button id='con' con-count="1 ">❤️</button> */}
            <div>
                <p>{user.name}</p>
                <br/>
                <button onClick={logout}>⚙️</button>
            </div>
            <div className='profileImg'><img src={user.profilePhoto} alt='not found'/></div>
            
        </div>
        
          <h6 style={{position:"Relative",left:"-40%"}}>Your Posts</h6>
          
          <br/><br/>
        <div className='usersPost'>
          {
            (userpost.length)
            ?
        userpost.map((postData) => (
          <div style={{backgroundImage:postData.postImg}} key={postData._id}>
              <img src={postData.postImg} alt=''/>  
          </div>

          ))
          :
          <p>no post to display</p>
          }
        </div>
      </div>
    </div>
    
    </>
  )
}
