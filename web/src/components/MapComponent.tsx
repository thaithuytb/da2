import React, { useContext, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "../css/map.css";
import { AuthContext } from "../contexts/AuthContext";

interface PropsMap {
  dataCoordinates?: any[];
  lengthStreet?: string;
  duration?: number;
  heartAverage?: string;
  realTime?: any;
  findPath?: any;
}

const MapComponent: React.FC<PropsMap> = ({
  dataCoordinates,
  realTime,
  findPath,
}) => {
  const { setIsCoordinate } = useContext(AuthContext)!;

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=S1qTEATai9KydkenOF6W",
      center: [105.84513, 21.005532],
      zoom: 16,
      // hash: "map",
      pitch: 60,
      maxPitch: 85,
      antialias: true,
    });
    setIsCoordinate(map);
    if (dataCoordinates && findPath) {
      findPath(map);
    }

    if (realTime) {
      realTime(map);
    }
    //realcoordinates(map);

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCoordinates]);

  return (
    <div>
      <div id="map" />
    </div>
  );
};

export default MapComponent;
