import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/pageCss/Profile.css"
export default function Profile() {

    // const backendapi="https://media-book-backend.vercel.app";
    const backendApi="http://localhost:5000";
const navigate = useNavigate()
const [user,setUser]=useState({});
function logout()
{
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

            <button id='con' con-count="10">Connections</button>
            <div className='profileImg'><img src={user.profilePhoto} alt='not found'/></div>
            <button onClick={logout}>Logout</button>
        </div>
      <h3>{user.name}</h3>
        
      </div>
    </div>
    
    </>
  )
}
