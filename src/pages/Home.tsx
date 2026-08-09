import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatIs from "@/components/WhatIs";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Design from "@/components/Design";
import Compare from "@/components/Compare";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-viral-bg text-viral-text font-body">
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <WhatIs />
        <Solutions />
        <HowItWorks />
        <Demo />
        <Design />
        <Compare />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}