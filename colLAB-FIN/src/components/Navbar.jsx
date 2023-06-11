import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Handle sign out success
      })
      .catch((error) => {
        // Handle sign out error
        console.log(error);
      });
  };

  return (
    <div className='navbar'>
      <span className='logo'>CHAT</span>
      {currentUser && (
        <div className='user'>
          <img src={currentUser.photoURL} alt='' />
          <span>{currentUser.displayName}</span>
          <button onClick={handleSignOut}>logout</button>
        </div>
      )}

    </div>
  );
};

export default Navbar;





/*import React, { useContext , useState} from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { collection, doc, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
const Navbar = () => {

  const {currentUser} = useContext(AuthContext);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        // Handle sign out success
      })
      .catch((error) => {
        // Handle sign out error
       { console.log(error);}
      });
  };

  return (
    <div className='navbar'>
      <span className="logo">CHAT</span>
     { currentUser && <div className="user">
         <img src={currentUser.photoURL} alt=""/>
         <span>{currentUser.displayName}</span>
         <button onClick={handleSignOut}>logout</button>
      </div>
     }
    </div>
  );
};

export default Navbar; */
