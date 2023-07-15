import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Layout
import Header from './layout/Header';
import Map from './layout/Map';
import History from './layout/History';

//import Context
import AuthProvider from './contexts/AuthContext';
import SocketProvider from './contexts/SocketContext';

function App() {
  // return(<Header></Header>)
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
