import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate()
  const {loading,handlelogin}=useAuth();
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)
const handlesumbit= async(e)=>{
    e.preventDefault();
    await handlelogin(username,password);
    navigate('/')
}
  return (
  <>
  <form onSubmit={handlesumbit}>
    <input type="text" name="username" id="username" required placeholder='username' onChange={(e)=>{
      setusername(e.target.value)
    }} />
    <input type="password" name="pass" id="password" required placeholder='password' onChange={(e)=>{
      setpassword(e.target.value)
    }} />
    <button>Login</button>
  </form>
  </>
  )
}

export default Login