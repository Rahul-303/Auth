import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    try {
      const res = await axios.post(`${server}/auth/signup`, formData);
      navigate("/sign-in");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
      <div>
        <h2>Signup</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        Already signed up? <Link to="/sign-in">Login</Link>
        <br />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};
