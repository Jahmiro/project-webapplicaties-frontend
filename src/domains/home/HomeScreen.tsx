import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { HomeContent } from "./components/HomeContent";

export const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
};
