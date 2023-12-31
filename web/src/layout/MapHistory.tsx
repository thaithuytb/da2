import React, { useEffect, useState } from "react";
import { Map } from "maplibre-gl";
import "../css/map.css";
import distance from "@turf/distance";
import { point } from "@turf/helpers";
import { CoordinateAPI } from "../api/coordinate";
import { useLocation } from "react-router";
import MapComponent from "../components/MapComponent";
import { CaretRightOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Data {
  created: string;
  heartRate: number;
}
const MapHistory = () => {
  const [isClosed1, setIsClosed1] = useState(true);

  const location = useLocation();
  const { item } = location.state;
  const [dataCoordinates, setDataCoordinates] = useState<[]>([]);
  const [duration, setDuration] = useState<number | undefined>();
  const [heartRates, setHeartRate] = useState<[]>([]);

  const [lengthStreet, setLengthStreet] = useState<string | undefined>();
  const [heartAverage, setHeartAverage] = useState<string | undefined>();
  const [step, setStep] = useState<number | undefined>();
  const [data, setData] = useState<any>();

  const coordinateAPI = new CoordinateAPI();
  const navigate = useNavigate();
  const clickNavigate = () => {
    navigate("/chart", { state: { data: data } });
  };

  useEffect(() => {
    (async () => {
      const response = await coordinateAPI.getCoordinates({ name: item.name });
      if (response.success) {
        setStep(response.data.step);
        setDataCoordinates(response.data.dataCoordinates);
        setHeartRate(response.data.heartRate);
        setDuration(response.data.duration);
        setData({
          history: item.name,
          data: response.data,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function findPath(map: Map) {
    map.on("load", function () {
      let coordinates = [...dataCoordinates];

      const start = coordinates[0];
      let calculatedDistance = 0;
      if (coordinates.length !== 0) {
        const y = coordinates?.reduce(
          (init: any, pre: any, index: any) => {
            if (index !== 0) {
              const x = distance(point(init.coordinate), point(pre), {
                units: "kilometers",
              });
              return {
                coordinate: pre,
                km: init.km + x,
              };
            }
            return {
              coordinate: coordinates[0],
              km: 0,
            };
          },
          {
            coordinate: coordinates[0],
            km: 0,
          }
        );
        calculatedDistance = y.km;
      }

      const calculatedDistanceInMeters = calculatedDistance * 1000;
      setLengthStreet(calculatedDistanceInMeters.toFixed(2));

      const dataArray: Data[] = heartRates;
      const heartRate = dataArray.map((data) => data.heartRate);
      const sum = heartRate.reduce(
        (total, currentValue) => total + currentValue,
        0
      );
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

        map.addSource("circle-start", {
          type: "geojson",
          data: {
            type: "Point",
            coordinates: coordinates[0],
          },
        });
        map.addLayer({
          id: "circle-layer",
          type: "circle",
          source: "circle-start",
          paint: {
            "circle-radius": 7,
            "circle-opacity": 1,
            "circle-color": "red",
          },
        });

        map.addSource("circle-end", {
          type: "geojson",
          data: {
            type: "Point",
            coordinates: coordinates[coordinates.length - 1],
          },
        });
        map.addLayer({
          id: "circle-layer-end",
          type: "circle",
          source: "circle-end",
          paint: {
            "circle-radius": 7,
            "circle-opacity": 1,
            "circle-color": "blue",
          },
        });
      }
    });
  }
  return (
    <div>
      {!isClosed1 ? (
        <img
          src="../alert.png"
          alt=""
          style={{ width: "30px" }}
          id="icon-close1"
          onClick={() => setIsClosed1(!isClosed1)}
        />
      ) : (
        <CloseCircleOutlined
          id="icon-close1"
          onClick={() => setIsClosed1(!isClosed1)}
        />
      )}
      <div id="if-history" style={{ display: !isClosed1 ? "none" : "block" }}>
        <div id="start">
          <b></b>
          <p>Điểm bắt đầu</p>
        </div>
        <div id="end">
          <b></b>
          <p>Điểm kết thúc</p>
        </div>
        <p id="length_history">Quãng đường di chuyển: {lengthStreet} m</p>
        <p id="time_history">Thời gian di chuyển: {duration} phút</p>
        <p id="time_history">Số bước di chuyển: {step} bước</p>
        <div id="heart_history" onClick={() => clickNavigate()}>
          <div style={{ display: "flex" }}>
            <span>Nhịp tim trung bình: {heartAverage} nhịp/phút</span>
            <span id="tri">
              <CaretRightOutlined />
            </span>
          </div>
        </div>
      </div>
      <MapComponent
        dataCoordinates={dataCoordinates}
        lengthStreet={lengthStreet}
        duration={duration}
        heartAverage={heartAverage}
        findPath={findPath}
      />
    </div>
  );
};

export default MapHistory;
