import About from "@/widgets/home/About";
import Hero from "@/widgets/home/Hero";
import Featured from "@/widgets/home/Featured";

import { events } from "@/utils/constants/Constants";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Featured events={events} />
      <About />
    </div>
  );
}
