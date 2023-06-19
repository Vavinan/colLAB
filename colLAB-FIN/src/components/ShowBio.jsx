import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ShowBio = ({ user }) => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const docRef = doc(db, 'bio', user);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const bioData = docSnapshot.data().content;
          setBio(bioData);
          console.log(user);

        } else {
          setBio('No bio available');
        }
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio();
  }, [user]);

  return <div>{bio}</div>;
};
