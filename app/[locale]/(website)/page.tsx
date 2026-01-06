import AboutUs from "./_components/AboutUs";
import FAQ from "./_components/FAQ";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import SuccessStories from "./_components/SuccessStories";
import WaveTransition from "./_components/WaveTransition";

export default function LandingPage() {
  return (
    <div className="max-h-screen overflow-auto sidebar-scrollbar">
      <Header />
      <Hero />
      <AboutUs />
      <HowItWorks />
      <div className="-mt-40">
        <WaveTransition />
      </div>
      <SuccessStories />
      <FAQ />
      <Footer />
    </div>
  );
}
