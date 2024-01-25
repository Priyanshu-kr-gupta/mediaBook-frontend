import React,{useEffect,useState} from 'react'
import "../css/componentCss/PostCard.css"
function PostCard(props) {

  const [postUser,setPostUser]=useState({name:"",profilePhoto:"",date:""})
  const userAuthenticate=async()=>{
    const res = await fetch("http://localhost:5000/api/post/getPostUser",{
      method:'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({postUserId:props.post.user})
  })
  // const response= await res.json()
  const json=await res.json()
 
    setPostUser({name:json.name,profilePhoto:json.profilePhoto,date:json.date})
    // console.log(json.user)
}
  useEffect(()=>{
    userAuthenticate()
  },[])
    return (
        <div className='postCard'>
              
              <div className='userDetails'>
                <img src={postUser.profilePhoto} alt=""   />
                <h3>{postUser.name}</h3>
                <h5>{postUser.date}</h5>
              </div>

              <div className='userPost'>
                    <p>{props.post.caption}</p>
                    <div className='postImg' style={{backgroundImage:`url(${props.post.postImg})`}}>
                      <img src={props.post.postImg} alt='not found'/>
                    </div>
              </div>
              
              <div className='likeComment'> 
                  <button>Like</button>
                  <button>Comment</button>
              </div>
              
              <div className='commentBox'>

              </div>
          </div>
          
    )
}

export default PostCard