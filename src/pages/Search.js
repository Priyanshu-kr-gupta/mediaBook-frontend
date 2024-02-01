import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/pageCss/Search.css"
export default function Search() {
  const [searchedUser, setSearchedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [searchUser,setSearchUser]=useState(0);
  const [getsearchUser,setGetSearchUser]=useState();
  const handleChange = (e) => {
    setSearchedUser(e.target.value);
  };
  const backendApi="https://media-book-backend.vercel.app";
  // const backendApi="http://localhost:5000";

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
      // setUsers(json);
      setUsers(json.user);

   
    };

    // Call the fetch function only if searchedUser is not an empty string

      fetchData();

  }, [searchedUser]); // Run the effect whenever searchedUser changes

    const findSearchedUser = async (suserid) =>{
      console.log(suserid)
      setSearchUser(1);
      // console.log(searchUser)
      setGetSearchUser(1);
      const response=await fetch(`${backendApi}/api/user/getSearchedUser`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:suserid}),
        
      }

      )
      const data=await response.json();
      // console.log(data.user)
      setGetSearchUser(data.user)
    }
  return (
    <>
    <div className='searchBox'>
      <input type='text' value={searchedUser} onChange={handleChange} className='userSearch' placeholder='search a user'/>
    <br/>
    <br/>
  
        {users.map(user => (
          <div key={user._id} className='userBox'  style={{backgroundImage:`url(${user.bgPhoto})`,backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>
            <div className='userCred'>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>

            {/* <button className='searchUser' onClick={()=>{findSearchedUser(user._id)}}>View</button> */}
            <Link to={`/user/${user._id}`} className='searchUser'>View</Link>      

          </div>
        ))}

    </div>
 
  </>
  );
}
