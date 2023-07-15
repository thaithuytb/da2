import React, { ReactNode, createContext, useEffect, useState } from 'react';
import socketIOClient, { Socket } from "socket.io-client";

interface ISocketContext {
}

interface PropsSocketContext {
    children: ReactNode;
}

export const SocketContext = createContext<ISocketContext | undefined>(undefined)

const SocketProvider: React.FC<PropsSocketContext> = ({ children }) => {

    const socket = socketIOClient(
        process.env.SERVER_WEB_SOCKET || "http://localhost:7000/da2"
    );


    //join Room
    useEffect(() => {

        const payload = { userId: 1 };
        socket.emit("joinMap", payload);

        //note return
        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const data = { socket }
    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider