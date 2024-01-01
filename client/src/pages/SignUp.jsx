import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function SignUp() {
  const [formData,setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) =>{
       setFormData({...formData , [e.target.id]:e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('/api/auth/signup', formData);
      // Handle the response as needed
      console.log(res.data); // Assuming you want to log the response data
      navigate('/sign-in')
    } catch (error) {
      // Handle errors
      console.error('Error submitting the form:', error);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='tex-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id="username" className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="email" placeholder='Email' id="email" className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>
        <input type="password" placeholder='Password' id="password" className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account</p>
        <Link to="/sign-in">
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp