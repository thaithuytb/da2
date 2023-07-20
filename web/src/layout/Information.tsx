import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/map.css'
import { AuthContext } from "../contexts/AuthContext";
import { CaretLeftOutlined } from "@ant-design/icons";


const Information = () => {
    const {isHeart, setIsHeart} = useContext(AuthContext)!; 

    console.log(isHeart);
  return (
    <div>
        <CaretLeftOutlined />
      
    </div>
  )
}

export default Information