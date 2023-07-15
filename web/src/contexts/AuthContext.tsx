import React, { ReactNode, createContext, useState } from 'react';

interface IAuthContext {
    user: any[]
    islogin: boolean
}

interface PropsAuthContext {
    children: ReactNode;
  }

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

const AuthProvider:React.FC<PropsAuthContext> = ({children}) => {

    const [user, setUser] = useState([])
    const [islogin, setIslogin] = useState<boolean>(true)

    const data = {
        user,
        islogin
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider