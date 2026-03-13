import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const { handleregister, loading } = useAuth();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    await handleregister(username, email, password);

    setusername("");
    setemail("");
    setpassword("");
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      
      <form onSubmit={handlesubmit} style={{display:"flex",flexDirection:"column",gap:"10px",width:"300px"}}>
        
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setusername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          required
        />

        <button type="submit">
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  );
};

export default Register;