import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom"
import PostCard from "../components/PostCard"
import "../css/pageCss/Home.css"
import Search from "./Search";

function Home() {

  const backendApi = process.env.REACT_APP_BACKEND_API;

  const navigate = useNavigate()
  const [post,setPost] = useState([]);
  const getAllPosts=async ()=>{
    const getAllPosts= await fetch(`${backendApi}/api/post/getAllPosts`,{
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
<Search />
  </div> 
     

  );
}

export default Home;