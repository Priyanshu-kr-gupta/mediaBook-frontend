import React,{useState} from 'react'
import "../css/pageCss/AddPost.css"
// import bgim from "../../public/logo192.png"
function AddPost() {
  const backendApi = process.env.REACT_APP_BACKEND_API;

  const [caption,setCaption]=useState("")
  const [postImg,setPostImg]=useState("")
  const handleClick=async (e)=>{
        e.preventDefault();
     
          try {
              const respon = await fetch(`${backendApi}/api/post/addPost`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "Application/json",
                      "auth-token": localStorage.getItem("auth-token")
                  },
                  body: JSON.stringify({caption,postImg})
              })
              const result=await respon.json();
                  console.log(result);
            
          } catch (error) {
          alert("Cant post");
          }
      
   
  }
  const onchange=(e)=>{
        setCaption(e.target.value)
  }
  const convertToBase64 = (file) => {
    const fileReader =new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPostImg(fileReader.result)
     
    };
}
const HandleImage = (e) => {
    const file = e.target.files[0];
  
    // console.log( e.target.files[0])
    convertToBase64(file);
}
  return (
  
       <div className="addPost">

      <form className="postform">
     
         
          
        
          <label htmlFor="description" className='addImg' style={{backgroundImage:`url(${postImg})`}}>
            
          {postImg?
           <img src={postImg} alt='' />:"➕"}
          </label>
          <input type="file" id='description'  onChange={HandleImage}/>
      
      
         <textarea type="text" className="" id="title" name="title" onChange={onchange} placeholder='write the content here'/><br/>

        <button type="submit" id='postSubmit' onClick={handleClick}>Post</button>
      </form>
      </div>
    
  )
}

export default AddPost