import React, { useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/map.css'
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import { CoordinateAPI } from "../api/coordinate";
import { useLocation } from "react-router";
import MapComponent from "../components/MapComponent";

interface Data {
  created: string;
  heartRate: number;
}
const MapHistory = () => {
  const location = useLocation()
  const { item } = location.state
  const [dataCoordinates, setDataCoordinates] = useState<[]>([])
  const [duration, setDuration] = useState<number | undefined>()
  const [heartRates, setHeartRate] = useState<[]>([])

  const [lengthStreet, setLengthStreet] = useState<string | undefined>()
  const [heartAverage, setHeartAverage] = useState<string | undefined>()

  const coordinateAPI = new CoordinateAPI();

  useEffect(() => {
    (async () => {
      const respones = await coordinateAPI.getCoordinates({ name: item.name })
      if (respones.success) {
        setDataCoordinates(respones.data.dataCoordinates)
        setHeartRate(respones.data.heartRate)
        setDuration(respones.data.duration)
      }
    })()
  }, [])

  function findPath(map: Map) {
    map.on("load", function () {
      let coordinates = [...dataCoordinates];

      const start = coordinates[0];
      const end = coordinates[coordinates.length - 1]
      const startp = point(start);
      const finish = point(end);
      const calculatedDistance = distance(startp, finish, { units: 'kilometers' });
      const calculatedDistanceInMeters = calculatedDistance * 1000;
      setLengthStreet(calculatedDistanceInMeters.toFixed(2));

      const dataArray: Data[] = heartRates
      const heartRate = dataArray.map(data => data.heartRate);
      const sum = heartRate.reduce((total, currentValue) => total + currentValue, 0);
      const average = sum / heartRate.length;
      setHeartAverage(average.toFixed(0));

      if (duration) {
        const durations = duration / 60;
        const roundedDuration = durations.toFixed(0);
        const parsedDuration = parseFloat(roundedDuration);
        setDuration(parsedDuration);
      }


      const checkStart = map.getSource("path");
      map.setCenter(start);
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

        map.addSource('circle-start', {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: coordinates[0]
          }
        })
        map.addLayer({
          'id': 'circle-layer',
          'type': 'circle',
          'source': 'circle-start',
          'paint': {
            'circle-radius': 7,
            'circle-opacity': 1,
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
  return (
    <div>
      <div id="map" />
      <MapComponent
        dataCoordinates={dataCoordinates}
        lengthStreet={lengthStreet}
        duration={duration}
        heartAverage={heartAverage}
      />
    </div>
  )
}

export default MapHistory