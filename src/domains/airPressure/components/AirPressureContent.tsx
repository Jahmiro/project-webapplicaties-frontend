import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { weatherData } from "../../../utillities/weatherData";

const windspeeds: any[] = weatherData;

export const AirPressureContent = () => {
  const slpData = windspeeds.map((windspeed) => ({
    stationId: windspeed.station.stationId,
    "Air pressure (in hPa)": windspeed.station.measurement.SLP,
  }));

  return (
    <div>
      <h2 className="m-8 text-2xl font-semibold text-gray-900">
        Top ten air pressure locations
      </h2>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={slpData}>
            <CartesianGrid opacity={0.5} vertical={false}/>
            <XAxis dataKey="stationId" />
            <YAxis type="number" domain={[850, 1100]} axisLine={false} tickCount={6}/>
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Air pressure (in hPa)"
              fill="#dc2626"
              label={{fill: "#ffffff" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
