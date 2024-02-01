import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom'



const Signup = () => {
    const navigate=useNavigate();

    const backendapi="https://media-book-backend.vercel.app";

    const [email,setEmail]= useState("")
    const [name,setName]= useState("")
    const [password,setPassword]= useState("")
    const [otp,setOtp]= useState("")
    const [checkOtpSent,setCheckotpSent]= useState(false)
    const [checkOtpVerified,setCheckOtpVeified]= useState(false)
    const [profileImg,setProfileImg] = useState("");
    const [bgImg,setBgImg] = useState("");
    const [loader,setLoader]=useState(false);


    const handleChangeEmail= (e) =>{
    setEmail(e.target.value)
  }
  const handleChangeName= (e) =>{
    setName(e.target.value)
  }
  const handleChangePassword= (e) =>{
    setPassword(e.target.value)
  }
    const handleChangeOtp=(e)=>{
      setOtp(e.target.value)

    }
  
  
  
  const handleOtp=async ()=>{
    setLoader(true);
        const response = await fetch(`${backendApi}/api/auth/sendOtp`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email})
        })
        const json=await response.json()
        if(json.status){
           setCheckotpSent(json.status);
           setLoader(false);
            // props.showAlert(json.msg,"success")
        }
        else{
          // props.showAlert(json.msg,"warning")
        }
    }
    const verifyOtp=async (e)=>{
    setLoader(true);

      const response = await fetch(`${backendApi}/api/auth/verifyOtp`,{
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body:JSON.stringify({email,otp})
      })
      const json=await response.json()
      if(json.status){
         setCheckOtpVeified(json.status);
         setLoader(false);
         
          // props.showAlert(json.msg,"successfully verified")
      }
      else{
        // props.showAlert(json.msg,"warning")
      }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    // console.log(PostData.postImg)
    console.log(email)
    console.log(name)
    console.log(password)
    console.log(profileImg)
    try {
        const respon = await fetch(`${backendApi}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({email,name,password,profileImg,bgImg})
        })
        const result=await respon.json();
            console.log(result);
        if(result.signup){
              localStorage.setItem("auth-token",result.authToken)
              navigate("/")
              console.log(result.msg)
              alert(result.msg,"success")
          }
    } catch (error) {
    alert("Cant register you");
    }
}
  
const convert = (file) => {
  const fileReader =new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    setBgImg(fileReader.result)
  };
}
const HandleBgImage = (e) => {
  const file = e.target.files[0];
  // console.log( e.target.files[0])
  convert(file);
}
  
  const convertToBase64 = (file) => {
    const fileReader =new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setProfileImg(fileReader.result)
    };
}
const HandleImage = (e) => {
    const file = e.target.files[0];
    // console.log( e.target.files[0])
    convertToBase64(file);
}
    return (
    <div>
      
      <h2>Sign Up</h2>

       
    {  (checkOtpSent && checkOtpVerified)?

     
        <form> 
         <div>
           <label htmlFor="name">Set user Name</label>
           <input name="name" type="text" id="name" onChange={handleChangeName}required/>
         </div>
         <div >
           <label htmlFor="password">Password</label>
           <input name="password" type="text" id="password" onChange={handleChangePassword}required/>
         </div>
         <div >
           <label htmlFor="profilePhoto">Profile photo (optional)</label>
           <input  type="file" id="profilePhoto" onChange={(e) => {HandleImage(e)}} required/>
         </div>
         <div >
           <label htmlFor="profilePhoto">Background photo (optional)</label>
           <input  type="file" id="bgPhoto" onChange={(e) => {HandleBgImage(e)}} required/>
         </div>
         <button type="submit" onClick={handleSubmit}>
         Sign Up
         </button>      
        </form> 
     

        :
        
        
        (!checkOtpSent)?
        
            <div >
              <label htmlFor="email">Email</label>
              <input name="email" type="email"  id="email" onChange={handleChangeEmail} required key={1}/>
              <button style={{cursor:"pointer",border:"2px solid black"}} onClick={handleOtp}>{loader?"wait...":"Send Otp"}</button>
            </div>
          
          :  

            <div>
              <label htmlFor="otp">Enter verification code</label>
              <input name="otp" type="text"  id="otp"  required key={2} onChange={handleChangeOtp}/>
              <button style={{cursor:"pointer",border:"2px solid black"}} onClick={verifyOtp}>{loader?"wait...":"Continue"}</button>
            </div>
          
      }
      <h5>Already have an account</h5>
      <Link to="/login">Login</Link>
      </div>
  )
}

export default Signup


