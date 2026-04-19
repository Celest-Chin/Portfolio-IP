import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CoreCapabilities } from "./components/CoreCapabilities";
import { StrategicPortfolio } from "./components/StrategicPortfolio";
import { Timeline } from "./components/Timeline";
import { InnovationSandbox } from "./components/InnovationSandbox";
import { BlogGrid } from "./components/BlogGrid";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CoreCapabilities />
        <StrategicPortfolio />
        <Timeline />
        <InnovationSandbox />
        <BlogGrid />
      </main>
      <Footer />
    </div>
  );
}
