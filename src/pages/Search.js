import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/pageCss/Search.css"
import {initializeSocket} from '../socket';


export default function Search() {
  const socket=initializeSocket()
  const [searchedUser, setSearchedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [requests,setRequests]=useState([]);
  const handleChange = (e) => {
   
      setSearchedUser(e.target.value);


  };
  const backendApi = process.env.REACT_APP_BACKEND_API;


  const fetchRequests = async () => {
    const response = await fetch(`${backendApi}/api/user/fetchRequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token"),

      },
    });
    const json = await response.json();

    setRequests(json.requestsUserDetails)
 
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backendApi}/api/user/searchUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchedUser }),
      });
      const json = await response.json();
      setUsers(json.user);

   
    };


      fetchData();
      fetchRequests();

  }, [searchedUser]); 

   

  const acceptRequest = async (reqid)=>
  {
    socket.emit("acceptConnectionRequest",reqid)    
    const response = await fetch(`${backendApi}/api/user/acceptRequest`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")

      },
      body: JSON.stringify({ reqid })
    });
    const json =await response.json();
  
  }
  return (
    <>
    <input type="checkbox" id="searchToggler" />
    <label htmlFor='searchToggler' className='searchTogglerLbl'>⬅️</label>
    <div className='searchBox'>
      <input type='text' value={searchedUser} onChange={handleChange} className='userSearch' placeholder='search a user'/>
    <br/>
    <br/>

    {requests.map(user => (
          <div key={user._id} className='userBox'>
            <div className='userCred'>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>

            <button onClick={()=>{acceptRequest(user._id)}}>Accept</ button>      

          </div>
         
        ))}
        <br/>
        <br/>
        <br/>
        {users.map(user => (
          <div key={user._id} className='userBox'  style={{backgroundImage:`url(${user.bgPhoto})`,backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>
            <div className='userCred'>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>

            <Link to={`/user/${user._id}`} className='searchUser'>View</Link>      

          </div>
        ))}

    </div>
 
  </>
  );
}
