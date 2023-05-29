import "./App.css";
import { Route, Routes } from "react-router-dom";
import paths from "../src/utillities/paths";
import { HomeScreen } from "./domains/home/HomeScreen";
import { LoginScreen } from "./domains/login/LoginScreen";
import { WindSpeedScreen } from "./domains/windSpeed/WindSpeedScreen";
import { AirpressureScreen } from "./domains/airPressure/AirPressureScreen";

function App() {
  return (
    <Routes>
      <Route path={paths.root.home.toString()} element={<HomeScreen />} />
      <Route path={paths.root.login.toString()} element={<LoginScreen />} />
      <Route path={paths.root.windspeed.toString()} element={<WindSpeedScreen />} />
      <Route path={paths.root.airpressure.toString()} element={<AirpressureScreen />} />
    </Routes>
  );
}

export default App;
