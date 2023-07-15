import React, { useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/map.css'
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import { CoordinateAPI } from "../api/coordinate";
import { useLocation } from "react-router";
import MapComponent from "../components/MapComponent";

const MapReal= () => {

  function realTime(map: Map){
    map.on("load", function () {
      let coordinates = [
        [1,2],
        [2,3],
        [3,4],
      ];

      const start = coordinates[0];
      const end = coordinates[coordinates.length - 1]

      const checkStart = map.getSource("source-real");
      //map.setCenter(start);
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
        map.addSource("source-real", {
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
          id: "layer-real1",
          type: "line",
          source: "source-real",
          paint: {
            "line-color": "#6527BE",
            "line-opacity": 1,
            "line-width": 4,
          },
        });

        map.addLayer({
          id: "layer-real2",
          type: "line",
          source: "source-real",
          paint: {
            "line-color": "#9681EB",
            "line-opacity": 0.5,
            "line-width": 12,
          },
        });

        map.addSource('circle-start-real',{
          type:'geojson',
          data:{
            type: 'Point',
            coordinates: coordinates[0]
          }
        })
        map.addLayer({
            'id':'layer-real-start',
            'type':'circle',
            'source':'circle-start-real',
            'paint':{
                'circle-radius':7,
                'circle-opacity':1,
                'circle-color': 'red'
            }
        })

        map.addSource('circle-end-real', {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: coordinates[coordinates.length - 1]
          }
        });
        map.addLayer({
          id: 'layer-real-end',
          type: 'circle',
          source: 'circle-end-real',
          paint: {
            'circle-radius': 7,
            'circle-opacity': 1,
            'circle-color': 'blue'
          }
        });
      }
    });
  }

  return (
    <div>
      <MapComponent />
    </div>
  )
}

export default MapReal