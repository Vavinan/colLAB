import React, { useEffect, useState } from 'react'
import {addDoc,collection} from 'firebase/firestore'
import { auth,db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import "./postcss.css";
const CreatePost = ( {onPostSuccess}) => {

  const [title,setTitle] = useState("");
  const[postContent,setPostContent]=useState("");
  const[skills,setSkills]=useState("");
  const[contact,setContact]=useState("");

  const navigate=useNavigate();
   useEffect(()=>{
    if(!auth.currentUser){
     navigate("/login");
    }
   },[navigate]);

  const postsCollectionRef=collection(db,"posts");

  const submitPost=async() => {
    if(title ==='' || postContent ===''){
      alert('Fill up the fields');
    } else{
        try {
          await addDoc(postsCollectionRef,{
            title:title,
            postContent: postContent,
            skills:skills,
            contact:contact,
            author :{
              name:auth.currentUser.displayName,
              id:auth.currentUser.uid,
             
            } 
          })

          //navigate("/");
          onPostSuccess();

        } catch(error){
          console.log(error);
        }
    }
  }


  return (
    <div className="createPost">
      <div className="postForm">
        <h1> Create a Post</h1>
        <div  className="mb-3">
        <label htmlFor="title" className="form-label"> Title</label>
        <input type="text" placeholder='Title' className='form-control' onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div  className="mb-3">
        <label htmlFor="posts" className="form-label"  > Description</label>
          <textarea placeholder='Description' className='form-control' onChange={(e)=>setPostContent(e.target.value)}></textarea>
        </div>
        <div  className="mb-3">
        <label htmlFor="tags" className="form-label"  > Skills required</label>
          <textarea placeholder='Skills' className='form-control' onChange={(e)=>setSkills(e.target.value)}></textarea>
        <label htmlFor="contact" className="form-label"  >Chat User Name </label>
        <input type="text" placeholder='Contact' className='form-control' onChange={(e)=>setContact(e.target.value)} />
        </div>
        <button className="btn btn-dark" onClick={submitPost} >POST</button>
      </div>
    </div>
  )
}

export default CreatePost;