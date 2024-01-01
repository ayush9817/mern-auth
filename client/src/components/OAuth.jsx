import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from '../firebase';


const OAuth = () => {
  const handleGoogleClick = async () => {
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth,provider);
      const res = await axios.post('api/auth/google',{
        name : result.user.displayName,
        email : result.user.email,
        photo : result.user.photoURL,
      }
      )
      console.log(res);
    }
    catch(err){
        console.log(err);
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with Googles</button>
  )
}

export default OAuth