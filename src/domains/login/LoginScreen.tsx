import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/footer";
import { LoginContent } from "./components/LoginContent";

export const LoginScreen = () => {
  return (
    <div>
      <Navbar />
      <LoginContent />
      <Footer />
    </div>
  );
};
