import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import "../css/pageCss/postPage.css"
import {initializeSocket} from '../socket';

import CommentCard from '../components/CommentCard';
import Fullpost from '../components/Fullpost';
export default function Post() {
  const backendApi = process.env.REACT_APP_BACKEND_API;
  const post=useParams();
  const userid=localStorage.getItem("userid")
  const [userpost, setUserpost] = useState([]);
  const [comment,setComment] = useState("");
  const [allComment,setAllComment] = useState([]);

  const socket=initializeSocket();

const getComment = async()=>{
  try {
    const response = await fetch(`${backendApi}/api/post/getComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
   
      },
      body: JSON.stringify({postid:post.postid})
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    const json = await response.json();
    setAllComment(json);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
  const sendComment =async()=>{
    try {
      const response = await fetch(`${backendApi}/api/post/commentPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
     
        },
        body: JSON.stringify({postid:post.postid,senderid:userid,receiverid:userpost[0].user,comment:comment})
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const json = await response.json();
      socket.emit("newcomment",post.postid,userpost[0].user)

      setComment("");
     getComment();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
   
  } 

  const getPost = async () => {
    try {
      const response = await fetch(`${backendApi}/api/post/getPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
     
        },
        body: JSON.stringify({postid:post.postid})
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
  useEffect(()=>{
    getPost();
    getComment();
  },[post])

  return (
    <div className='postPage'>
    <Header />
    <div className='postPagePostContainer'>
      <div className='postPagePost' style={{overflow:"Scroll"}}>

    { userpost.map((postdata)=>{
      
      return  <Fullpost key={postdata._id} post={postdata} />
    }
  )
  
}
{/* <PostCard post={userpost[0]} /> */}
<div className='commentBox'>
  
  <div className='commentsection'>
    {
        allComment.map((comment)=>{
          return  <CommentCard key={comment._id} details={comment}/>
        })
      
    }
      </div>
  <div className='commentInput'>
  <textarea onChange={(e)=>{ setComment(e.target.value)  }} maxLength={50} value={comment}/>
      <button onClick={sendComment}>send</button> 
  </div>
      
      
  </div>
</div>
  </div>
  
  
    </div>
  )
}
