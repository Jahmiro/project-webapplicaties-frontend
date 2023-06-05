import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { WindSpeedContent } from "./components/WindSpeedsScreen";

export const WindSpeedScreen = () => {
  return (
    <div>
      <Navbar />
      <WindSpeedContent />
      <div>
        <Footer />
      </div>
    </div>
  );
};
