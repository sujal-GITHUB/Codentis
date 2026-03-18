import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Demo from "./components/Demo";
import Terminal from "./components/Terminal";
import Install from "./components/Install";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Demo />
      <CTA />
      <Footer />
      <Analytics/>
    </>
  );
}
