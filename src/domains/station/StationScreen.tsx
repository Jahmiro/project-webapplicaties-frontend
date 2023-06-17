import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { StationData } from "./components/StationData";

export const StationScreen = () => {
  return (
    <div>
      <Navbar />
      <StationData />
      <Footer />
    </div>
  );
};
