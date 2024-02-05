import React,{useContext, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AddPost from "./pages/AddPost";
import User from "./pages/User";
import Connections from "./pages/Connections";
import ContextApi from "./context/ContextApi";
import { io } from 'socket.io-client';

function App() {
  const sk = useContext(ContextApi);

  return (
  
       <div className="App"> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddPost />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/user/:userId" element={<User />} />
        </Routes>
        </div> 
  );
}

export default App;
