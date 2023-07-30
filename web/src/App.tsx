import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedMain from './protectedRoute';
//import Layout
import Header from './layout/Header';
import Login from './layout/Login';
import MapReal from './layout/MapReal';
import MapHistory from './layout/MapHistory';
import History from './layout/History';
//import Context
import AuthProvider from './contexts/AuthContext';
import SocketProvider from './contexts/SocketContext';
import Chart from './layout/Chart';
import Information from './layout/Information';
import ChangePassword from './layout/ChangePassword';

function App() {
  // return(<Header></Header>)
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />
        {/* <div style={{ marginTop: '8vh' }}> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedMain />}>
              <Route path="/home" element={<MapReal />} />
                <Route>
                  <Route path="/history" element={<History />} />
                  <Route path="/history/:id" element={<MapHistory />} />
                  <Route path="/chart" element={<Chart />} />
                  <Route path="/information" element={<Information />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                </Route>
              </Route>
          </Routes>
        {/* </div> */}
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
