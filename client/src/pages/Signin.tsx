import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e: any) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signin",
        formData
      );
      navigate("/");
      console.log(res.data);
      window.localStorage.setItem("token","Bearer "+ res.data.token);
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
        New here? <Link to="/login">Login</Link>
        <br />
        <button onClick={handleSignin}>Signup</button>
      </div>
    </div>
  );
};
