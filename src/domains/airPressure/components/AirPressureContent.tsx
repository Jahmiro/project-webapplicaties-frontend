import React, { useState, useEffect } from "react";
import { toXML } from "jstoxml";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Datepicker from "react-tailwindcss-datepicker";

export const AirPressureContent = () => {
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [slpData, setSlpData] = useState([]);

  const handleValueChange = (value: any) => {
    setValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (value.startDate && value.endDate) {
        console.log(value.startDate);
        const response = await fetch(
          `http://localhost:9090/api/top10/airpressure/${value.startDate}`
        );
        const data = await response.json();
        setSlpData(data);
      }
    };
    fetchData();
  }, [value]);

  function DownloadXML() {
    fetch(`http://localhost:9090/api/top10/airpressure/${value.startDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("not succesfull");
        }
        return response.json();
      })
      .then((data) => {
        let filename = `top10_airpressure_peaks_${value.startDate}_data.xml`;
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
    <div className="overflow-hidden">
      <h2 className="m-8 text-2xl font-semibold text-gray-900">
        Top ten air pressure locations
      </h2>
      <div className="m-8 w-full flex items-center">
        <div className="w-96 pr-4">
          <h2 className="mb-1 text-xl text-gray-900">Select date</h2>
          <Datepicker
            toggleClassName="absolute hidden rounded-r-lg text-white right-0 h-full px-3"
            primaryColor="red"
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
            displayFormat="DD-MM-YYYY"
            minDate={new Date(new Date().getTime() - 100 * 24 * 60 * 60 * 1000)}
            maxDate={new Date()}
          />
        </div>
        <div className="w-full mr-16 flex self-end justify-end">
          <button
            onClick={DownloadXML}
            className="mx-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            download XML
          </button>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={slpData}>
            <CartesianGrid opacity={0.5} vertical={false} />
            <XAxis dataKey="station.id" />
            <YAxis
              type="number"
              domain={[850, 1100]}
              axisLine={false}
              tickCount={6}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="station_air_pressure"
              fill="#dc2626"
              label={{ fill: "#ffffff" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
