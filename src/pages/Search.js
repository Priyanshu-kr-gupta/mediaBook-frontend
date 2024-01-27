import React, { useState, useEffect } from 'react';
import "../css/pageCss/Search.css"
export default function Search() {
  const [searchedUser, setSearchedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [searchUser,setSearchUser]=useState("");
  const [getsearchUser,setGetSearchUser]=useState(0);
  const handleChange = (e) => {
    setSearchedUser(e.target.value);
  };
  // const backendapi="https://media-book-backend.vercel.app";
  // const backendapi="http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://media-book-backend.vercel.app/api/user/searchUser', {
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
      setSearchUser(suserid);
      setGetSearchUser(1);
      const response=await fetch("https://media-book-backend.vercel.app/api/user/getSearchedUser",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchUser),
        
      }

      )
      console.log(response.json)
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

            <button className='searchUser' onClick={()=>{findSearchedUser(user._id)}}>View</button>

            {/* <link className='followButton' onClick={() => {connect(user._id)} }>View</link> */}

          </div>
        ))}

    </div>
    {(searchUser)?
    <div className='searchedUser'>
      <h1>{searchUser}</h1>
      <div className='searchProfile'>
      <button className='cancelSearchUser' onClick={()=>{setSearchUser("")}}>❌</button>
      <div className='searchUserBackgroundImage'>
        <img src="" alt='not found'/>
      </div>
      <div className='searchUserProfileContainer'>
        <div className='searchUserTopData'>

            <button>Connections</button>
            <div className='searchUserProfileImg'><img src="" alt='not found'/></div>
            <button>Follow</button>
        </div>
      <h3></h3>
        
      </div>
    </div>
    </div>
    :<div>
      
    </div>
    }
  </>
  );
}
