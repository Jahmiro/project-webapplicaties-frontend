import React, { useEffect, useState } from "react";
import { Marker, Map, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapPin from "../../../assets/mapPin.svg";
import arrowUp from "../../../assets/arrowUp.svg";
import { api } from "../../../api/api";
import { Link, useLocation } from "react-router-dom";

export const WindSpeedContent = () => {
  const [stations, setStations] = useState("");
  const [viewState, setViewState] = useState({
    latitude: 2.4,
    longitude: 45.3,
    zoom: 4,
  });
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:9090/api/stations/mogadishu-1500km/"
        );
        const data = await response.json();
        setStationData(data);
      } catch (error) {
        console.error("Failed to fetch station data:", error);
      }
    }

    fetchData();
  }, []);

  const location = useLocation();

  return (
    <div style={{ width: "100%", height: "85vh" }}>
      <Map
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/jah97/cli96xd4w00hs01qydpgr83o0"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {stationData.map((stationData) => (
          <Marker
            key={stationData.id}
            latitude={stationData.latitude}
            longitude={stationData.longitude}
          >
            <button onClick={() => handleMarkerClick(stationData)}>
              <img src={mapPin} width={30} height={30} alt="Marker" />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeOnClick={false}
            anchor="top"
            className="flex items-center justify-center z-50"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold pb-2 leading-6 text-gray-900">
                    Station:
                    <Link
                      className={`text-sm mr-4 font-semibold leading-6 ${
                        location.pathname === `/station/${selectedMarker.id}`
                          ? "text-red-600"
                          : "text-gray-900"
                      } hover:text-red-600`}
                      to={`/station/${selectedMarker.id}`}
                    >
                      {selectedMarker.id}
                    </Link>
                  </h3>
                  <p>longitude: {selectedMarker.longitude}</p>
                  <p>latitude: {selectedMarker.latitude}</p>
                  <div className="flex"></div>
                </div>
              </div>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
};
