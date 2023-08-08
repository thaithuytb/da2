import React, { ReactNode, createContext, useEffect, useState } from "react";
import { AuthAPI } from "../api/user";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  user: any;
  islogin: boolean;
  setUser: any;
  setIslogin: (islogin: boolean) => void;
  openMenu: any;
  setopenMenu: any;

  isCoordinate: any;
  setIsCoordinate: any;

  isCenter: any;
  setIsCenter: any;
}

interface PropsAuthContext {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<PropsAuthContext> = ({ children }) => {
  const [user, setUser] = useState();
  const [islogin, setIslogin] = useState<boolean>(false);
  const [openMenu, setopenMenu] = useState<boolean>(false);
  const [isCoordinate, setIsCoordinate] = useState<any>();
  const [isCenter, setIsCenter] = useState<any>();

  const authAPI = new AuthAPI();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        try {
          const res = await authAPI.autoLogin();
          if (res.success) {
            const { user } = res.data;
            setUser(user);
            setIslogin(true);
            navigate("/home");
          }
        } catch (error: any) {
          localStorage.removeItem("token");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = {
    user,
    islogin,
    setUser,
    setIslogin,
    openMenu,
    setopenMenu,
    isCoordinate,
    setIsCoordinate,
    isCenter,
    setIsCenter,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
