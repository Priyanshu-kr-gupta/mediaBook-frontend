import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Login(props) {
const [message,setMes]=useState("Login");
    const backendapi="https://media-book-backend.vercel.app";
    //const backendApi="http://localhost:5000";
    const navigate=useNavigate();
    const userInitial={email:"",password:""}
    const [user,setUser]= useState(userInitial)
    const {email,password} = user
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setMes("wait");
        const {email,password} = user
        const response = await fetch(`${backendApi}/api/auth/loginUser`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email,password})
        })
        const json=await response.json()
        if(json.login){
            localStorage.setItem("auth-token",json.authToken)
            // alert(json.msg); 
            navigate("/")
        }
        else{
          alert(json.msg,"warning");
        }
        
    }
  return (
      <div>
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={email}  id="email" onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={password}  id="password" onChange={handleChange}/>
          </div>
          <button type="submit" >
          {mes}
          </button>
        </form>
        <h5>Don't have a account</h5>
      <Link to="/signup">Signup</Link>
      </div>
  )
}

export default Login
