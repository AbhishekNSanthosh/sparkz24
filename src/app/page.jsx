import Credits from "@/widgets/Credits";
import Footer from "@/widgets/Footer";
import About from "@widgets/About";
import LandingPage from "@widgets/LandingPage/view";

export default function Home() {
  return (
    <>
      <LandingPage />
      <About />
      <Footer/>
      <Credits/>
    </>
  );
}
