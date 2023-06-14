import React, { useState } from "react";
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
import { weatherData } from "../../../utillities/weatherData";
import Datepicker from "react-tailwindcss-datepicker";

const windspeeds: any[] = weatherData;

export const AirPressureContent = () => {
  const slpData = windspeeds.map((windspeed) => ({
    stationId: windspeed.station.stationId,
    "Air pressure (in hPa)": windspeed.station.measurement.SLP,
  }));

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    const startDate = newValue.startDate ? new Date(newValue.startDate) : null;
    if (
      startDate &&
      startDate >= new Date(new Date().getTime() - 40 * 24 * 60 * 60 * 1000) &&
      startDate <= new Date()
    ) {
      setValue(newValue);
    } else {
      setValue((prevValue) => ({
        ...prevValue,
        startDate: prevValue.startDate,
      }));
    }
  };
  return (
    <div className="overflow-hidden	">
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
            minDate={new Date(new Date().getTime() - 40 * 24 * 60 * 60 * 1000)}
            maxDate={new Date()}
          />
        </div>
        <div className="w-full mr-16 flex  self-end justify-end">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Download data
          </button>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={slpData}>
            <CartesianGrid opacity={0.5} vertical={false} />
            <XAxis dataKey="stationId" />
            <YAxis
              type="number"
              domain={[850, 1100]}
              axisLine={false}
              tickCount={6}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Air pressure (in hPa)"
              fill="#dc2626"
              label={{ fill: "#ffffff" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
