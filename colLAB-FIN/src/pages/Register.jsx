import React, { useState,useEffect } from 'react';
import add from "../images/add.png";
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification,deleteUser } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc,query,setDoc,getDocs, collection, where } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';


export const Register = () => {
  
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [verification, setVerification] = useState(false);
  const [username,setUsername] = useState("");
  const [nameExists,setNameExists] = useState(false)

  const handleKey = async () =>{
    const q = query (
     collection (db,"users"),
     where("displayName","==",username) 
     );
 
     try {
       const querySnapshot = await getDocs(q);
       /*querySnapshot.forEach((doc) =>{
         setNameExists(true)
       });*/
       if (querySnapshot.empty) {
        setNameExists(false); // No documents found, name does not exist
      } else {
        setNameExists(true); // Documents found, name already exists
      }
     } catch(err){
         setErr(true);
     }
    };


  const handleSubmit = async (e) => {

    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(nameExists){
      return
    }

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user); // Send verification email
      setVerification(true);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db,"userChats",res.user.uid),{});
           // navigate("/");
           setTimeout(() => {
            const user = auth.currentUser;
            if (user && !user.emailVerified) {
              deleteUser(user).catch((error) => {
            alert("as a result of failed to verify your email your account bas been deleted")
              });
            }
          }, 1 * 60 * 1000); // 1 minute
        

          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { emailVerified } = userDoc.data();
          if (emailVerified) {
            navigate("/");
          }
        }
      }
    };

    checkVerificationStatus();
  }, [navigate]);



  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">CHAT</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="NAME" name='displayName' 
            onKeyDown ={handleKey}  
            onChange={ (e) =>setUsername(e.target.value)} value={username} />
          {nameExists && <span>Name already exists</span>}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Register</button>
          {err && <span>Something went wrong</span>}
          {verification && <span>A verification email has been sent to your email address. Please verify your email before logging in.</span>}

        </form>
        <p>Already have an account? <Link to="/login"> LOGIN</Link></p>
      </div>
    </div>
  );
};

