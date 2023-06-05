import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { LoginContent } from "./components/LoginContent";

export const LoginScreen = () => {
  return (
    <div>
      <Navbar />
      <LoginContent />
      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};
