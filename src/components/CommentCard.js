import React, { useEffect, useState } from 'react'
import "../css/componentCss/CommentCard.css"

import {initializeSocket} from '../socket';

export default function CommentCard(Props) {
  const socket=initializeSocket();
const [commentUser,setCommentUser]=useState({name:""});
const backendApi = process.env.REACT_APP_BACKEND_API;

  const fetchCommentUserData = async () => {
    const response = await fetch(`${backendApi}/api/user/searchCommentUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:Props.details.sender}),
    });
    const json = await response.json();
    // console.log(json.user[0].name)
    setCommentUser({name:json.user[0].name});
 
  };
  
  useEffect(()=>{

    fetchCommentUserData();
  },[])
  
  return (
    <div className='commentCard'>
        <div className='commentHero'>
            {
              commentUser.name
            }
        </div>
        <div className='commentMsg'>
           {Props.details.comment}
        </div>
        <div className='commenFooter'>
        time
        </div>
    </div>
  )
}
