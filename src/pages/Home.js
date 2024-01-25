// import React,{useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from "../components/Navbar"
// import "../css/pageCss/Home.css"
// export default function Home() {
//     const navigate=useNavigate(); 
// useEffect(()=>{
//     if(!localStorage.getItem("auth-token")){
//         navigate("/login");
// }})
    
//   return (
//     <>
//     <div className='homePage'>
//     <div className='stoies'>

//     </div>
//     <div className='posts'>
        
//     </div>
//     </div>
//     </>
//   )
// }
import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom"
import PostCard from "../components/PostCard"
import "../css/pageCss/Home.css"

function Home() {
  const navigate = useNavigate()
  const [post,setPost] = useState([]);
  const getAllPosts=async ()=>{
    const getAllPosts= await fetch("http://localhost:5000/api/post/getAllPosts",{
      method:"POST",
      headers:{
        "Content-Type": "Application/json",

      },
    })
    const json= await getAllPosts.json();
    setPost(json)

  } 
  useEffect(() => {
      if(localStorage.getItem("auth-token")){
         getAllPosts();
      }
      else{
          navigate('/login')
      }
  }, []);
  return (
<div className="homePage">
{/* <div>MediaBook 2.O</div>   */}

<div className="allPosts">
<div className="stories">

</div>
        {post.map((postData) => {
          return (
            <PostCard
            key={postData._id}
            post={postData}        
            />
            
            );
          })}
</div>
  </div> 
     

  );
}

export default Home;