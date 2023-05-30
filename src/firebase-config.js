import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDNAUvsf_42WIwVUMSykCyyxqJVvAcpcyQ",
  authDomain: "collab-test-a4077.firebaseapp.com",
  projectId: "collab-test-a4077",
  storageBucket: "collab-test-a4077.appspot.com",
  messagingSenderId: "419920325209",
  appId: "1:419920325209:web:715292b158f89e39325f48",
  measurementId: "G-W5PQRT57XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {app,db,auth,provider};
