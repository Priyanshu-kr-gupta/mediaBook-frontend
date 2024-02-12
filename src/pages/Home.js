import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../css/pageCss/Home.css";
import Search from "./Search";
import socket from '../socket';
function Home() {
  const backendApi = process.env.REACT_APP_BACKEND_API;
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${backendApi}/api/post/getAllPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
     
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const json = await response.json();
      setPost(json);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
      if (localStorage.getItem("auth-token")) {
         getAllPosts();
      } else {
        navigate("/login");
      }
      // socket.on("newUser",(data) =>{

      // })


    
  }, []);

  return (
    <div className="homePage">
      <div className="allPosts">
      <div className="stories"></div>
        {post.map((postData) => (
          <PostCard key={postData._id} post={postData} />
        ))}
      </div>
      <Search />
    </div>
  );
}

export default Home;
