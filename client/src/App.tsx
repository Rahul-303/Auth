import { Routes, Route } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import Home from "./pages/Home"

function App() {
  return (
    <>
     <Routes>
     <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<Signin />}/>
      <Route path="/sign-up" element={<Signup />}/>
     </Routes>
    </>
  )
}

export default App
