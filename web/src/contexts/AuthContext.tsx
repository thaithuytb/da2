import React, { ReactNode, createContext, useState } from 'react';

interface IAuthContext {
    user: any[]
    islogin: boolean
    setUser: any
    setIslogin: (islogin: boolean)=>void

    isHeart: any
    setIsHeart: any
    openMenu: any
    setopenMenu: any
}

interface PropsAuthContext {
    children: ReactNode;
  }

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

const AuthProvider:React.FC<PropsAuthContext> = ({children}) => {

    const [user, setUser] = useState([])
    const [islogin, setIslogin] = useState<boolean>(false)
    const [isHeart, setIsHeart] = useState<[]>([])
    const [openMenu, setopenMenu] = useState<boolean>(false)

    const data = {
        user,
        islogin,
        setUser,
        setIslogin,

        isHeart,
        setIsHeart,
        openMenu,
        setopenMenu
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider