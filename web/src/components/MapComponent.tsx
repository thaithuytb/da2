import React, { useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/map.css'
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import { CoordinateAPI } from "../api/coordinate";
interface PropsMap {
  name: string
}

const MapComponent: React.FC<PropsMap> = ({name}) => {

  const [dataCoordinates, setDataCoordinates] = useState<[]>([])

  const coordinateAPI = new CoordinateAPI();

  useEffect(() => {
    (async() => {
        const respones = await coordinateAPI.getCoordinates({name: name})
      if(respones.success) {
        setDataCoordinates(respones.data.dataCoordinates)
        console.log(respones);
        
      }
    })()
  }, [])

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/fefc1891-4e0d-4102-a51f-09768f839b85/style.json?key=S1qTEATai9KydkenOF6W",
      center: [105.84513, 21.005532],
      zoom: 16,
      hash: "map",
    });

    if(dataCoordinates.length){
      findPath(map)
    }
    realcoordinates(map);

    return () => map.remove();
  }, [dataCoordinates]);
  
  
  function findPath(map: Map) {
    map.on("load", function () {
      
      let coordinates = [...dataCoordinates];
      
      const start = coordinates[0];
      const end = coordinates[coordinates.length - 1]
      const startp = point(start);
      const finish = point(end);
      const calculatedDistance = distance(startp, finish, { units: 'kilometers' });
      const calculatedDistanceInMeters = calculatedDistance * 1000;

      const element = document.getElementById("length_street") as HTMLElement;
      const datasearch = `Quãng đường di chuyển: ${calculatedDistanceInMeters.toFixed(2)} m`;
      if (element) {
          element.innerText = datasearch;
      }

      const averageSpeed = 5; // Tốc độ di chuyển trung bình (kilomet/giờ)
      const travelTimeInHours = calculatedDistance / averageSpeed; // Thời gian di chuyển (giờ)
      // Chuyển đổi thời gian di chuyển sang phút và giây
      const travelTimeInMinutes = travelTimeInHours * 60;
      
      const elements = document.getElementById("time_street") as HTMLElement;
      const datasearchs = `Thời gian di chuyển: ${travelTimeInMinutes.toFixed(2)} phút`;
      if (elements) {
        elements.innerText = datasearchs;
      }

      const checkStart = map.getSource("path");

      if (checkStart) {
        (checkStart as maplibregl.GeoJSONSource).setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
          properties: {},
        });
      } else {
        map.addSource("path", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        });

        map.addLayer({
          id: "path-layer",
          type: "line",
          source: "path",
          paint: {
            "line-color": "#6527BE",
            "line-opacity": 1,
            "line-width": 4,
          },
        });

        map.addLayer({
          id: "path-layer1",
          type: "line",
          source: "path",
          paint: {
            "line-color": "#9681EB",
            "line-opacity": 0.5,
            "line-width": 12,
          },
        });

        map.addSource('circle-start',{
          type:'geojson',
          data:{
            type: 'Point',
            coordinates: coordinates[0]
          }
        })
        map.addLayer({
            'id':'circle-layer',
            'type':'circle',
            'source':'circle-start',
            'paint':{
                'circle-radius':7,
                'circle-opacity':1,
                'circle-color': 'red'
            }
        })

        map.addSource('circle-end', {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: coordinates[coordinates.length - 1]
          }
        });
        map.addLayer({
          id: 'circle-layer-end',
          type: 'circle',
          source: 'circle-end',
          paint: {
            'circle-radius': 7,
            'circle-opacity': 1,
            'circle-color': 'blue'
          }
        });
      }
    });
  }

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
      <div id="map" />
      <div id='if-length'>
        <p id='length_street'></p>
        <p id='time_street'></p>
        <button id='ok_length'>Ok</button>
      </div>
    </div>
  );
};

export default MapComponent;
