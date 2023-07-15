import React from 'react';
import '../css/header.css';
import { MenuOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <div className="header">
      <div className="header_left">
        <img style={{ width: "30px", height: "auto", marginRight: "0.5rem" }}
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png" alt="" />
        <h3>Đại học bách khoa hà nội</h3>
      </div>

      <div className="header_right">
        <MenuOutlined />
        <div className='header-menu'>
          <h3>Adim</h3>
          <ul>
            <li>Map</li>
            <li>Lich su</li>
            <li>Thong ke</li>
          </ul>
          <h3>Dang xuat</h3>
        </div>
      </div >
    </div >
  )
}

export default Header