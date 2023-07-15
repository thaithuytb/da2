import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RefreshUrl = () => {
  // if (true) {
  //   return <Navigate to="/" />
  // }
  return <Navigate to="/" />;
};

const ProtectedMain = () => {
  const auth = useContext(AuthContext);
  const isAuth = auth?.islogin
  return !isAuth ? <RefreshUrl /> : <Outlet />
};

export default ProtectedMain;