import { Route, Routes } from "react-router-dom";
import React,{useEffect} from "react";
import './App.css';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AddPost from "./pages/AddPost"
// import Search from "./pages/Search";
import User from "./pages/User";
import Connections from "./pages/Connections";
import {AppContextProvider} from "./context/ContextApi"
function App() {

 

  
  return (
<AppContextProvider>


    <div className="App">
      <Navbar />
      <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create" element={<AddPost/>}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/user/:userId" element={<User />}/>
      </Routes>

    </div>
</AppContextProvider>
  );
}

export default App;
