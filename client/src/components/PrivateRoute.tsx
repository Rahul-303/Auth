import { useRecoilValue } from "recoil"
import { authState } from "../store/authState"
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
  const user = useRecoilValue(authState);
  return user.username ? <Outlet/> : <Navigate to = "/sign-in"/>
}

export default PrivateRoute