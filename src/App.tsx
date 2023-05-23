import "./App.css";
import { Route, Routes } from "react-router-dom";
import paths from "../src/utillities/paths";
import { HomeScreen } from "./domains/home/HomeScreen";
import { LoginScreen } from "./domains/login/LoginScreen";

function App() {
  return (
    <Routes>
      <Route path={paths.root.home.toString()} element={<HomeScreen />} />
      <Route path={paths.root.login.toString()} element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
