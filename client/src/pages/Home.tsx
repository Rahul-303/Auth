import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const user = useRecoilValue(authState);
  const navigate = useNavigate();
  console.log(user);

  useEffect(()=>{
    if(!user.username){
      localStorage.clear();
      navigate('/sign-in')
    }
  },[])
  
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2>Welcome {user.username}</h2>
        <div style={{ marginTop: 25, marginLeft: 20 }}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              sessionStorage.clear();
              navigate('/sign-in');
            }}
          >
            Logout
          </button>
          <button onClick={() => navigate('/todos')}>
            get and add todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
