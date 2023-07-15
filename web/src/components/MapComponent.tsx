import React, { useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/map.css'
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import { CoordinateAPI } from "../api/coordinate";
interface PropsMap {
  dataCoordinates?: any[]
  lengthStreet?: string
  duration?: number
  heartAverage?: string
  realcoordinates?: any
  realTime?: any
}


const MapComponent: React.FC<PropsMap> = (
  {
    dataCoordinates,
    lengthStreet,
    duration,
    heartAverage,
    realcoordinates,
    realTime
  }
  ) => {

  const coordinateAPI = new CoordinateAPI();

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/fefc1891-4e0d-4102-a51f-09768f839b85/style.json?key=S1qTEATai9KydkenOF6W",
      center: [105.84513, 21.005532],
      zoom: 16,
      hash: "map",
    });

    // if(dataCoordinates.length){
    //   findPath(map)
    // }
    realcoordinates(map);
    realTime(map);

    return () => map.remove();
  }, [dataCoordinates]);

  
  return (
    <div>
      <div id="map" />
      <div id='if-length'>
        <p id='length_street'>Quãng đường di chuyển: {lengthStreet} m</p>
        <p id='time_street'>Thời gian di chuyển: {duration} phút</p>
        <p id='heart'>Nhịp tim: {heartAverage} nhịp/phút</p>
        <button id='ok_length'>Ok</button>
      </div>
    </div>
  );
};

export default MapComponent;
