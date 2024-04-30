import { Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element = { <PrivateRoute/>}>
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
