import React,{useEffect,useState} from 'react'
import "../css/componentCss/Fullpost.css"
import {initializeSocket} from '../socket';
import {Link} from "react-router-dom"
export default function Fullpost(props) {
    const socket =initializeSocket();

    const user=localStorage.getItem("userid");
       const backendApi = process.env.REACT_APP_BACKEND_API;
     const [postUser,setPostUser]=useState({id:"",name:"",profilePhoto:"",date:""})
     const [likeCount, setLikeCount] = useState(0);
     const [CommentCount, setCommentCount] = useState(0);
         const [status, setLikeStatus] = useState(false);
         const userId=localStorage.getItem("userid")
   
         const handleLikes = async () => {
           try {
             if(status)
             {
               setLikeStatus(false);
               setLikeCount(likeCount-1);
               socket.emit("likeUpdate",props.post._id,-1,postUser.id)
             }
             else
             {
               setLikeStatus(true);
               setLikeCount(likeCount+1);
               const heart = document.getElementById(props.post._id);
               heart.style.animation="heartBeat 1s";
               setTimeout(() => {
                 heart.style.animation = "";
               }, 1000);
             }
             const response = await fetch(backendApi+"/api/post/likePost",{
               method:'POST',
               headers:{
                 "Content-Type": "application/json"
               },
               body:JSON.stringify({postId:props.post._id,userId:userId})
             })
             const json=await response.json()
             const data=json.success
               // if (data) {
               //     getLikeCount();
               // }
           } catch (error) {
               console.error('Error liking/unliking:', error);
           }
       };
   
       const getLikeCount = async () => {
           try {
               const response = await fetch(backendApi+`/api/post/getLikesCount/${props.post._id}`,{
                 method:'POST',
                 headers:{
                   "Content-Type": "application/json"
                 },
               body:JSON.stringify({userId:userId})
   
               })
               const json=await response.json()
               const data=json.likeCount
               const like=json.status
               // console.log(data)
               setLikeStatus(like);
               setLikeCount(data);
           } catch (error) {
               console.error('Error getting like count:', error);
           }
       };
       const getCommentCount = async () => {
         try {
             const response = await fetch(backendApi+`/api/post/getCommentsCount/${props.post._id}`,{
               method:'POST',
               headers:{
                 "Content-Type": "application/json"
               },
   
             })
             const json=await response.json()
             const data=json.CommentCount
             setCommentCount(data);
         } catch (error) {
             console.error('Error getting like count:', error);
         }
     };
     const userAuthenticate=async()=>{
       const res = await fetch(`${backendApi}/api/post/getPostUser`,{
         method:'POST',
         headers:{
           "Content-Type": "application/json"
         },
         body:JSON.stringify({postUserId:props.post.user})
     })
     // const response= await res.json()
     const json=await res.json()
    
       setPostUser({id:json._id,name:json.name,profilePhoto:json.profilePhoto,date:json.date})
       // console.log(json.user)
   }
   
   
   
     useEffect(()=>{
       userAuthenticate()
       getLikeCount()
       getCommentCount()
     },[])
     useEffect(()=>{
       socket.on("likeUpdate",(postId,update,uid)=>{
     
         if(postId===props.post._id && uid!==userId)
           setLikeCount(likeCount+update);
     })
     })
  return (
    <div className='fullpostCard'>
              
    <div className='fullpostuserDetails'>
      <img src={postUser.profilePhoto} alt=""   />
      <h3>{postUser.name}</h3>
      <h5>{postUser.date}</h5>
    </div>

    <div className='fullpostuserPost'>
        
        <p>{props.post.caption}</p>
          <div className='fullpostpostImg' style={{backgroundImage:`url(${props.post.postImg})`}} onDoubleClick={handleLikes}>
            <img src={props.post.postImg} alt='not found'/>
    <div className="heart" id={props.post._id} onDoubleClick={handleLikes}>🤍</div>

          </div>
    </div>
    
    <div className='fullpostlikeComment'> 
        <button onClick={handleLikes} >{status?"❤️":"🤍"}{likeCount} Likes</button>
        <button>🗨️ {CommentCount} Comment</button>
        {/* 🗨️ {CommentCount} Comment */}

    </div>
    
    {/* <div className='commentBox' id='cmntBox'>
          
    </div> */}
</div>
  )
}
