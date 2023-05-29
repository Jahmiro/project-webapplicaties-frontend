import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { AirPressureContent } from "./components/AirPressureContent";

export const AirpressureScreen = () => {
  return (
    <div>
      <Navbar />
      <AirPressureContent />
      <Footer />
    </div>
  );
};
