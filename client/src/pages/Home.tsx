import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Todos from "./Todos";

const Home = () => {
  const user = useRecoilValue(authState);
  const [showTodo, setShowTodo] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2>Welcome {user.username}</h2>
        <div style={{ marginTop: 25, marginLeft: 20 }}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate('/sign-in');
            }}
          >
            Logout
          </button>
          <button onClick={() => setShowTodo(true)}>
            get todos
          </button>
        </div>
      </div>
      {showTodo && <Todos />}
    </div>
  );
};

export default Home;
