import About from "@/widgets/home/About";
import Hero from "@/widgets/home/Hero";
import Featured from "@/widgets/home/Featured";

import BandCompetition from "@/widgets/home/BandCompetition";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Featured />
      <About />
      <BandCompetition/>
    </div>
  );
}
