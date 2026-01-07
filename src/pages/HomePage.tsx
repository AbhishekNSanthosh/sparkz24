import About from "@/widgets/home/About";
import Hero from "@/widgets/home/Hero";
import Featured from "@/widgets/home/Featured";

import BandCompetition from "@/widgets/home/BandCompetition";
import ITBPExhibition from "@/widgets/home/ITBPExhibition";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Featured />
      <About />
      <ITBPExhibition />
      <BandCompetition/>
    </div>
  );
}
