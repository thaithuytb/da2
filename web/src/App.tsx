import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedMain from './protectedRoute';
//import Layout
import Header from './layout/Header';
import Login from './layout/Login';
import MapReal from './layout/MapReal';
import MapHistory from './layout/MapHistory';
//import Context
import AuthProvider from './contexts/AuthContext';
import SocketProvider from './contexts/SocketContext';
import { useEffect } from 'react';
import { CoordinateAPI } from './api/coordinate';


function App() {
  // return(<Header></Header>)
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />
        <div style={{ marginTop: '8vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedMain/>}>
              <Route path="/home" element={<MapReal />} />
              <Route path="/history" element={<MapHistory />} />
            </Route>
          </Routes>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
