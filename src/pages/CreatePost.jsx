import React, { useEffect, useState } from 'react'
import {addDoc,collection} from 'firebase/firestore'
import {auth,db} from "../firebase-config"
import { useNavigate } from 'react-router-dom'
const CreatePost = ({isAuth}) => {
   
 useEffect(()=>{
    if(!isAuth){
     navigate("/login");
    }
 })

  const [title,setTitle] = useState("");
  const[postContent,setPostContent]=useState("");
  
  let navigate=useNavigate();

  const postsCollectionRef=collection(db,"posts");
  const submitPost=async() => {
    if(title ==='' || postContent ===''){
      alert('Fill up the fields');
    } else{
        try {
          await addDoc(postsCollectionRef,{
            title:title,
            postContent: postContent,
            author :{
              name:auth.currentUser.displayName,
              id:auth.currentUser.uid
            } 
          })
          navigate("/");
        } catch(error){
          console.log(error);
        }
    }
  }


  return (
    <div className="container">
      <div className="bg-light p-5 rounded mt-3">
        <h1> Create a Post</h1>
        <div  className="mb-3">
        <label htmlFor="title" className="form-label"> Title</label>
        <input type="text" placeholder='Title' className='form-control' onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div  className="mb-3">
        <label htmlFor="posts" className="form-label"  > Description</label>
          <textarea placeholder='Description' className='form-control' onChange={(e)=>setPostContent(e.target.value)}></textarea>
        </div>
        <button className="btn btn-dark" onClick={submitPost} >POST</button>
      </div>
    </div>
  )
}

export default CreatePost;