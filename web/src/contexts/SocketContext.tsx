import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

interface ISocketContext {
  socketClient: Socket | null
  
  dataReal: any,
  setDataReal: any

  legStreet: any,
  setLegStreet: any,

  lengthStreet: any, 
  setLengthStreet: any,
  
  heartRates: any, 
  setHeartRate: any
}

interface PropsSocketContext {
  children: ReactNode;
}

export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);

const SocketProvider: React.FC<PropsSocketContext> = ({ children }) => {
  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const socketContext = useContext(SocketContext)
  const [legStreet, setLegStreet] = useState<string | undefined>()
  const [lengthStreet, setLengthStreet] = useState<string | undefined>()
  const [heartRates, setHeartRate] = useState<number | undefined>()
  const [dataReal, setDataReal] = useState<any[]>([])

  useEffect(() => {
    if (socketClient) {
        console.log(231);
        
      socketClient.on("start", (data) => {
        setDataReal([])
      })

      socketClient.on("end", (data) => {
        setDataReal([])
      })

      socketClient.on("data", (data) => {
        console.log(data);
        setDataReal((pre: any) => [...pre, [...data.geometry.coordinates]])
        setLegStreet(data.properties.step)
        setHeartRate(data.properties.heartRate)
        // setDuration(data.properties.duration) 
        console.log(13);
        
      })

      return () => {
        socketClient.off("start")
        socketClient.off("end")
        socketClient.off("data")
      }
    }
  }, [socketClient])

  //join Room
  useEffect(() => {
    if (process.env.REACT_APP_SERVER_WEB_SOCKET) {
      const socket = socketIOClient(process.env.REACT_APP_SERVER_WEB_SOCKET);
      setSocketClient(socket);

      const payload = { userId: 1 };
      socket.emit("joinUser", payload);

      //note return
      return () => {
        socket.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  const data = { 
    socketClient,
    legStreet, 
    setLegStreet,
    lengthStreet, 
    setLengthStreet,
    heartRates, 
    setHeartRate,
    dataReal,
    setDataReal,
  };
  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
