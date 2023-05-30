import React from 'react'
import {signInWithPopup} from "firebase/auth";
import { auth,provider } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
const Login = ({setIsAuth}) => {
  const navigate = useNavigate();
  
  const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider).then((result)=>{
      localStorage.setItem("isAuth",true);
       setIsAuth(true);
       navigate('/');
    })
  }
  return (
    <div className="container">
      <div className="card mt-5 text-center">
         <div className="card-body">
          <p className="display-6 mt-3">SignIn with GOOGLE</p>

          <button className="btn btn-dark" onClick={signInWithGoogle} > GOOGLE</button>
         </div>
      </div>
    </div>
  )
}

export default Login