import React, { ReactNode, createContext, useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

interface ISocketContext {
  socketClient: Socket | null;
}

interface PropsSocketContext {
  children: ReactNode;
}

export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);

const SocketProvider: React.FC<PropsSocketContext> = ({ children }) => {
  const [socketClient, setSocketClient] = useState<Socket | null>(null);

  //join Room
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4998/api/da2");
    setSocketClient(socket);

    const payload = { userId: 1 };
    socket.emit("joinUser", payload);

    //note return
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = { socketClient };
  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
