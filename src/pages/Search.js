import React, { useState, useEffect } from 'react';
import "../css/pageCss/Search.css"
export default function Search() {
  const [searchedUser, setSearchedUser] = useState('');
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setSearchedUser(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/user/searchUser', {
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

    const connect = async (con) =>{
      // console.log(con)
      const response=await fetch("http://localhost:5000/api/user/connectUser",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({con}),

      }

      )

    }
  return (
    <div className='searchBox'>
      <input type='text' value={searchedUser} onChange={handleChange} />

  
        {users.map(user => (
          <div key={user._id} className='userBox'  style={{backgroundImage:`url(${user.bgPhoto})`,backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>
            <div className='userCred'>
              <img src={user.profilePhoto} alt='not found'/>
              <h5>{user.name}</h5>
            </div>

            <button className='followButton' onClick={() => {connect(user._id)} }>Add Friend</button>

          </div>
        ))}

    </div>
  );
}
