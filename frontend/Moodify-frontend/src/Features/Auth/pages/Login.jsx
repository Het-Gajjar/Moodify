import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import "../../../style/Auth.css";

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
    <div className="app-container">
      <div className="glass-panel" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="heading-title" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome Back</h1>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "2rem" }}>Log in to Moodify</p>
        <form onSubmit={handlesumbit} style={{ display: "flex", flexDirection: "column" }}>
          <input className="input-field" type="text" name="username" id="username" required placeholder='Username' onChange={(e)=>{
            setusername(e.target.value)
          }} />
          <input className="input-field" type="password" name="pass" id="password" required placeholder='Password' onChange={(e)=>{
            setpassword(e.target.value)
          }} />
          <button className="btn-primary" style={{ marginTop: "1rem" }}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login