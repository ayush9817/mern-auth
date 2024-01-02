import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user);
  console.log(currentUser);
  return (
    <div className='p-3 max-w-lg mx-auto'>
   <h1 className='text-3xl font-semibold text-center my-7'> Profile</h1>
   <form className='flex flex-col gap-4'>
      <img src={currentUser.profilePicture} alt='profile' className='h-24 w-24 self-center rounded-full object-cover mt-2'/>
      <input defaultValue={currentUser.username} type='text' id='username' placeholder='Username' className='bg-slate-200 rounded-lg p-3 ' />
      <input defaultValue={currentUser.email} type='email' id='email' placeholder='Email' className='bg-slate-200 rounded-lg p-3 ' />
      <input type='password' id='password' placeholder='Password' className='bg-slate-200 rounded-lg p-3 ' />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Update</button>
   </form>
   </div>
  )
}

export default Profile