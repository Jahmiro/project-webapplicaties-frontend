import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toXML } from "jstoxml";

export interface StationData {
  timestamp: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  wind_direction: number;
  wind_speed: number;
}

export const StationData = () => {
  const { id } = useParams(); // Access the id parameter from the route
  const [data, setData] = useState<StationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/stations/mogadishu-1500km/station/${id}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  function getCardinalDirection(heading: number) {
    if (heading > 350 || heading < 10) {
      return "N";
    }
    if (heading >= 80 && heading < 100) {
      return "E";
    }
    if (heading >= 170 && heading < 190) {
      return "S";
    }
    if (heading >= 260 && heading < 280) {
      return "W";
    }
    if (heading >= 30 && heading < 60) {
      return "NE";
    }
    if (heading >= 120 && heading < 150) {
      return "SE";
    }
    if (heading >= 210 && heading < 240) {
      return "SW";
    }
    if (heading >= 300 && heading < 330) {
      return "NW";
    }
    if (heading >= 10 && heading < 30) {
      return "NNE";
    }
    if (heading >= 60 && heading < 80) {
      return "ENE";
    }
    if (heading >= 100 && heading < 120) {
      return "ESE";
    }
    if (heading >= 150 && heading < 170) {
      return "SSE";
    }
    if (heading >= 190 && heading < 210) {
      return "SSW";
    }
    if (heading >= 260 && heading < 240) {
      return "WSW";
    }
    if (heading >= 280 && heading < 30) {
      return "WNW";
    }
    if (heading >= 330 && heading < 350) {
      return "NNW";
    }
  }

  function DownloadXML() {
    fetch(`http://localhost:9090/api/stations/mogadishu-1500km/station/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("not succesfull");
        }
        return response.json();
      })
      .then((data) => {
        let filename = `station_${id}_data.xml`;
        let xml = toXML(data);

        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(xml)
        );
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <button
        onClick={DownloadXML}
        className="mx-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        download XML
      </button>
      <h2 className="m-8 text-2xl font-semibold text-white-900">
        Station: {id}
      </h2>
      <div className="m-5">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white-500 dark:text-white-400">
            <thead className="text-xs text-white-700 uppercase bg-white-50 dark:bg-white-700 dark:text-white-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  timestamp
                </th>
                <th scope="col" className="px-6 py-3">
                  windspeed
                </th>
                <th scope="col" className="px-6 py-3">
                  windDirection
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.timestamp.date}
                  className="bg-white border-b dark:bg-white-800 dark:border-white-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white-900 whitespace-nowrap"
                  >
                    {item.timestamp.date}
                  </th>
                  <td className="px-6 py-4">{item.wind_speed} km/h</td>
                  <td className="px-6 py-4">
                    {item.wind_direction}°{" "}
                    {getCardinalDirection(item.wind_direction)}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={3}>no records...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
