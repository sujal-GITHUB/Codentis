import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Architecture from "./components/Architecture";
import Demo from "./components/Demo";
import Terminal from "./components/Terminal";
import Install from "./components/Install";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Architecture />
      <Demo />
      <Terminal />
      <Install />
      <CTA />
      <Footer />
    </>
  );
}
