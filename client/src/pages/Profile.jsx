import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import axios from 'axios';
import { deleteUserSuccess, updateUserSuccess } from '../redux/user/UserSlice';


const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image,setImage] = useState(undefined)
  const [progress,setProgress] = useState(0);
  const [formdata,setformData] = useState({});
  console.log(formdata);
  console.log("image",image);
  console.log(currentUser);
  useEffect(()=>{
      if(image){
        handlefileUplaod(image);
      }
  },[image])
  const handlefileUplaod = async (image)=>{
    console.log("from upload hi");
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Update progress
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress,"%");
        setProgress(progress);
      },
      (error) => {
        // Handle error
        console.error("Error uploading image:", error);
      },
      async () => {
        // Upload completed, get the download URL
        try {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('File available at:', downloadURL);
          setformData({...formdata,profilePicture:downloadURL});
          
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      }
      );
  }
  const handleChange = (e) =>{
    setformData({...formdata,[e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res =  await axios.post(`/api/user/update/${currentUser._id}`,formdata)
      console.log(res.data);
      dispatch(updateUserSuccess(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteAccount = async (e) =>{
    e.preventDefault();
    try {
      const res =  await axios.post(`/api/user/delete/${currentUser._id}`)
      console.log(res.data);
      dispatch(deleteUserSuccess());
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignOut = async (e)=>{
    e.preventDefault();
    try {
      const res =  await axios.get(`/api/auth/signout`)
      console.log(res.data);
      dispatch(deleteUserSuccess());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
   <h1 className='text-3xl font-semibold text-center my-7'> Profile</h1>
   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type='file' ref={fileRef} accept='images/.*' onChange={(e)=>{setImage(e.target.files[0])}}   hidden/>
      <img src={currentUser.profilePicture} alt='profile' className='h-24 w-24 self-center rounded-full object-cover mt-2'
       onClick={()=>{fileRef.current.click()}}/>
      <input defaultValue={currentUser.username} type='text' id='username' placeholder='Username' className='bg-slate-200 rounded-lg p-3 'onChange={handleChange} />
      <input defaultValue={currentUser.email} type='email' id='email' placeholder='Email' className='bg-slate-200 rounded-lg p-3 'onChange={handleChange} />
      <input type='password' id='password' placeholder='Password' className='bg-slate-200 rounded-lg p-3 ' onChange={handleChange}/>
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Update</button>
   </form>
   <div className='flex justify-between mt-5'>
     <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
     <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
   </div>
   </div>
  )
}

export default Profile