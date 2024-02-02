import React,{useState} from 'react'
// import noteContext from "../context/notes/noteContext";

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
    <div>
       <div className="">

      <form className="">
      <div className="">
          <label htmlFor="title">Caption</label>
          <input type="text" className="" id="title" name="title" onChange={onchange}/>
          
        </div>
      <div >
          <label htmlFor="description">AddImage</label>
          <input type="file"   onChange={HandleImage}/>
        </div>
   
        <button type="submit" onClick={handleClick}>Submit</button>
      </form>
      </div>
    </div>
  )
}

export default AddPost