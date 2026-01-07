import About from "@/widgets/home/About";
import Hero from "@/widgets/home/Hero";
import Featured from "@/widgets/home/Featured";

import BandCompetition from "@/widgets/home/BandCompetition";
import ITBPExhibition from "@/widgets/home/ITBPExhibition";
import ISROExhibition from "@/widgets/home/ISROExhibition";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Featured />
      <About />
      <ISROExhibition/>
      <ITBPExhibition />
      <BandCompetition/>
    </div>
  );
}
