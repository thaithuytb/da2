import React, { useContext, useState } from 'react';
import '../css/header.css';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {

  const [openMenu, setopenMenu] = useState<boolean>(false)
  const authContext = useContext(AuthContext)
  const setUser = authContext?.setUser
  const setIslogin = authContext?.setIslogin
  const isLogin = authContext?.islogin
  const logout = () => {
    if (setUser && setIslogin) {
      setUser()
      setIslogin(false)
      setopenMenu(!false)
    }

  }

  return (
    <div className="header">
      <div className="header_left">
        <img style={{ width: "30px", height: "auto", marginRight: "0.5rem" }}
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png" alt="" />
        <h3>Đại học Bách Khoa Hà Nội</h3>
      </div>

      <div className="header_right">
        {isLogin &&
          <MenuOutlined onClick={() => setopenMenu(!openMenu)} />
        }
      </div >

      <div className={`header-menu ${!openMenu ? "hidden" : ''}`} >
        <h3>Admin</h3>
        <ul>
          <li onClick={() => setopenMenu(!openMenu)} ><Link to={'/home'}>Map</Link></li>
          <li onClick={() => setopenMenu(!openMenu)} ><Link to={'/history'}>Lịch sử</Link></li>
          <li onClick={() => setopenMenu(!openMenu)} ><Link to={'/'}>Thống kê</Link></li>
        </ul>
        <h3 onClick={logout}>Đăng xuất</h3>
      </div>
    </div >
  )
}

export default Header