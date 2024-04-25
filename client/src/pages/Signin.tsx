import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authState";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(authState);

  const handleSignin = async (e: any) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    try {
      const res = await axios.post(`${server}/auth/signin`, formData);
      navigate("/");
      console.log(res.data);
      window.localStorage.setItem("token", "Bearer " + res.data.token);
      setUser({token : null, username: res.data.username})
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
      <div>
        <h2>Signin</h2>
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
        New here? <Link to="/sign-up">Login</Link>
        <br />
        <button onClick={handleSignin}>Sign in</button>
      </div>
    </div>
  );
};
