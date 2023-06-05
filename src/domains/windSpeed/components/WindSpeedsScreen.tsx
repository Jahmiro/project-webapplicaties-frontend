import React, { useEffect, useState } from "react";
import { weatherData } from "../../../utillities/weatherData";
import { Marker, Map, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapPin from "../../../assets/mapPin.svg";
import arrowUp from "../../../assets/arrowUp.svg";

const windspeeds: any[] = weatherData;

export const WindSpeedContent = () => {
  const [viewState, setViewState] = useState({
    latitude: 9.733,
    longitude: 4,
    zoom: 5,
  });
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  return (
    <div style={{ width: "100%", height: "85vh" }}>
      <Map
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/jah97/cli96xd4w00hs01qydpgr83o0"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {windspeeds.map((windspeed) => (
          <Marker
            key={windspeed.station.stationId}
            latitude={windspeed.station.latitude}
            longitude={windspeed.station.longitude}
          >
            <button onClick={() => handleMarkerClick(windspeed)}>
              <img src={mapPin} width={30} height={30} alt="Marker" />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            latitude={selectedMarker.station.latitude}
            longitude={selectedMarker.station.longitude}
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
                    Station: {selectedMarker.station.stationId}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Wind speed: {selectedMarker.station.measurement.WDSP} km/h
                  </p>
                  <div className="flex">
                    <p className="text-sm text-gray-500">Wind direction:</p>
                    <img
                      style={{
                        rotate: `${selectedMarker.station.measurement.WNDDIR}deg`,
                      }}
                      src={arrowUp}
                      width={15}
                      height={15}
                      alt="Marker"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
};
