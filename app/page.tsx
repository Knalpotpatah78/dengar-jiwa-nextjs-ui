import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Psychologists from "@/components/Psychologists";
import Testimonials from "@/components/Testimonials";
import Articles from "@/components/Articles";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Psychologists />
        <Testimonials />
        <Articles />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
