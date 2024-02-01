import { Route, Routes } from "react-router-dom";
import React,{useEffect} from "react";
import './App.css';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AddPost from "./pages/AddPost"
import Search from "./pages/Search";
function App() {

 

  
  return (


    <div className="App">
      <Navbar />
      <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create" element={<AddPost/>}/>
          {/* <Route path="/search" element={<Search />}/> */}
      </Routes>

    </div>
  );
}

export default App;
