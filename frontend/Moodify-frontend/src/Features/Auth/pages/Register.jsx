import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../../../style/Auth.css";

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
    <div className="app-container">
      <div className="glass-panel" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="heading-title" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Create Account</h1>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "2rem" }}>Join Moodify today</p>
        
        <form onSubmit={handlesubmit} style={{ display: "flex", flexDirection: "column" }}>
          
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required
          />

          <button className="btn-primary" type="submit" style={{ marginTop: "1rem" }}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;