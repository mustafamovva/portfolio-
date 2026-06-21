import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-base text-body">
      <Navbar />
      <span id="top" />
      <Hero />
      <Stats />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
