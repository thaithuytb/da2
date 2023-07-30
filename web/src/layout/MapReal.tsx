import React, { useContext, useEffect, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import '../css/map.css'
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import MapComponent from "../components/MapComponent";
import { SocketContext } from "../contexts/SocketContext";
import { CloseCircleOutlined } from '@ant-design/icons';

// interface Data {
//   created: string;
//   heartRate: number;
// }

const MapReal = () => {
  const socketContext = useContext(SocketContext)
  const socketClient = socketContext?.socketClient

  const [dataReal, setDataReal] = useState<any[]>([])
  // const [duration, setDuration] = useState<number | undefined>()
  const [heartRates, setHeartRate] = useState<number | undefined>()
  const [lengthStreet, setLengthStreet] = useState<string | undefined>()
  const [legStreet, setLegStreet] = useState<string | undefined>()

  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if (socketClient) {
      socketClient.on("start", (data) => {
        setDataReal([])
      })

      socketClient.on("end", (data) => {
        setDataReal([])
      })

      socketClient.on("data", (data) => {
        console.log(data);
        setDataReal((pre) => [...pre, [...data.geometry.coordinates]])
        setLegStreet(data.properties.step)
        setHeartRate(data.properties.heartRate)
        // setDuration(data.properties.duration)
      })

      return () => {
        socketClient.off("start")
        socketClient.off("end")
        socketClient.off("data")
      }
    }
  }, [socketClient])

  function realTime(map: Map) {
    map.on("load", function () {
      realTimes(dataReal)
    });


    function realTimes(coordinates: any[]) {
      if (!coordinates?.length) {
        return;
      }
      const start = coordinates[0];
      const end = coordinates[coordinates.length - 1]
      const startp = point(start);
      const finish = point(end);
      const calculatedDistance = distance(startp, finish, { units: 'kilometers' });
      const calculatedDistanceInMeters = calculatedDistance * 1000;
      setLengthStreet(calculatedDistanceInMeters.toFixed(2));

      if (heartRates) {
        const heartRate = heartRates.toFixed(0);
        const parsedheartRate = parseFloat(heartRate);
        setHeartRate(parsedheartRate);
      }

      const checkStart = map.getSource("source-real");
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

        map.addSource('circle-start-real', {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: coordinates[0]
          }
        })
        map.addLayer({
          'id': 'layer-real-start',
          'type': 'circle',
          'source': 'circle-start-real',
          'paint': {
            'circle-radius': 7,
            'circle-opacity': 1,
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
    }
  }

  return (
    <div>
      {
        !isClosed ? <img src="../alert.png" alt="" style={{ width: '30px' }} id="icon-close1" onClick={() => setIsClosed(!isClosed)} /> :
          <CloseCircleOutlined id="icon-close1" onClick={() => setIsClosed(!isClosed)} />
      }
      <div id='if-length' style={{ display: !isClosed ? 'none' : 'block' }}>
        <div id="start">
          <b></b>
          <p>Điểm bắt đầu</p>
        </div>
        <div id="end">
          <b></b>
          <p>Điểm kết thúc</p>
        </div>
        <p id='length_street'>Quãng đường di chuyển: {lengthStreet} m</p>
        <p id='time_street'>Thời gian di chuyển: { } phút</p>
        <p id='heart'>Nhịp tim: {heartRates} nhịp/phút</p>
        <p id='leg'>Số bước chân: {legStreet} bước</p>
      </div>

      <MapComponent
        realTime={realTime}
        dataCoordinates={dataReal}
      />
    </div>
  )
}

export default MapReal