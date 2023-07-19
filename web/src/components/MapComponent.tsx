import React, { useContext, useEffect, useState } from "react";
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
  realTime?: any
  findPath?: any
}

const MapComponent: React.FC<PropsMap> = (
  {
    dataCoordinates,
    lengthStreet,
    duration,
    heartAverage,
    realTime,
    findPath
  }
  ) => {

   
  const coordinateAPI = new CoordinateAPI();

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=S1qTEATai9KydkenOF6W",
      center: [105.84513, 21.005532],
      zoom: 16,
      hash: "map",
      pitch: 60,
      maxPitch: 85,
      antialias: true
    });

    if(dataCoordinates && findPath){
      findPath(map)
    }

    if(realTime){
      realTime(map);
    }
    //realcoordinates(map);

    return () => map.remove();
  }, [dataCoordinates]);
  
  function realcoordinates(map: Map) {
    map.on("load", function () {
      navigatorPosition(function (coordinates: number[]) {
        const coordinate = coordinates as LngLatLike
        map.setCenter(coordinate);
        map.addSource('circle',{
          type:'geojson',
          data:{
            type: 'Point',
            coordinates: coordinates
          }
        })
        map.addLayer({
            'id':'circle-layer1',
            'type':'circle',
            'source':'circle',
            'paint':{
                'circle-radius':7,
                'circle-opacity':1,
                'circle-color': 'red'
            }
        })
        return coordinate;
      });
    });
   
  
    function navigatorPosition(callback: (coordinates: number[]) => void): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lng: number = position.coords.longitude;
          const lat: number = position.coords.latitude;
    
          const coordinates: number[] = [lng, lat];
          callback(coordinates);
        });
      } else {
        console.log("Geolocation không được hỗ trợ trong trình duyệt này");
      }
    }
  }
  
  return (
    <div>
      
    </div>
  );
};

export default MapComponent;
