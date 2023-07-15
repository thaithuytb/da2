import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RefreshUrl = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />
  }
  return <></>;
};

const ProtectedMain = () => {
  const auth = useContext(AuthContext);
  const isAuth = auth?.islogin
  return !isAuth ? <RefreshUrl /> : <Outlet />
};

export default ProtectedMain;